const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');
const UserService = require('./user.service');
const sendMail = require('../mailer/nodemailer');

const userService = new UserService();

class ResultadosService {
	constructor() {}

	// Enviar correo de nuevo resultado
	async sendNewResultado(id) {
		const user = await userService.findUserById(id);

		// Si el usuario no existe, lanza un error de no autorizado
		if (!user) {
			throw boom.unauthorized();
		}

		const respuesta = await sendMail(user, 'newResult');
		return respuesta;
	}

	// Crear resultados
	async createResultado(data) {
		console.log(data);
		const newResultado = await models.Resultado.create(data);
		return newResultado;
	}

	// Obtener resultados
	async findAllResultados(query) {
		const options = {
			include: ['examen'],
			where: {}
		};
		// Paginacion
		const { limit, offset } = query;
		if (limit && offset) {
			options.limit = limit;
			options.offset = offset;
		}
		// filtrar por nombre
		const { name } = query;
		if (name) {
			options.where.name = {
				[Op.substring]: name
			};
		}
		// filtrar por fecha especifica
		const { resultadoDate } = query;
		if (resultadoDate) {
			options.where.resultadoDate = resultadoDate;
		}
		// filtrar por rango de fecha
		const { resultadoDate_min, resultadoDate_max } = query;
		if (resultadoDate_min && resultadoDate_max) {
			options.where.resultadoDate = {
				[Op.gte]: resultadoDate_min,
				[Op.lte]: resultadoDate_max
			};
		}
		const rta = await models.Resultado.findAll(options);
		return rta;
	}

	async findResultadosByUserId(userId) {
		const resultados = await models.Resultado.findAll({
			where: {
				id_paciente: userId
			}
		});
		return resultados;
	}

	// Obtener resultado especifico
	async findResultadoById(idResultado) {
		const resultado = await models.Resultado.findByPk(idResultado, {
			include: ['examen', 'user']
		});
		// Manejo y captura de error por middlewares
		if (!resultado) {
			throw boom.notFound('Resultado no encontrado');
		}
		if (resultado.isBlock) {
			throw boom.conflict('Resultado con acceso restringido');
		}
		return resultado;
	}

	// Actualizar resultados
	async update(idResultado, changes) {
		const resultado = await this.findOne(idResultado);
		const rta = await resultado.update(changes);
		return rta;
	}

	// Eliminar resultados
	async delete(idResultado) {
		const resultado = await models.Resultado.findByPk(idResultado);
		await resultado.destroy();
		return { idResultado };
	}
}

module.exports = ResultadosService;
