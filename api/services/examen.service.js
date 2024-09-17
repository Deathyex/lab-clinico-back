const boom = require('@hapi/boom');

// Importa los modelos de la base de datos
const { models } = require('../libs/sequelize');

class ExamenService {
	constructor() {}

	// Método para crear un nuevo examen
	async createExamen(data) {
		const newExamen = await models.Examen.create(data);
		return newExamen;
	}

	// Método para obtener todos los exámenes
	async findAllExamenes() {
		const examenes = await models.Examen.findAll();
		return examenes;
	}

	// Método para encontrar un examen por su ID
	async findExamenById(idExamen) {
		const examen = await models.Examen.findByPk(idExamen, {
			include: ['resultado']
		});

		// Si el examen no se encuentra, lanza un error 404
		if (!examen) {
			throw boom.notFound('Examen no encontrado');
		}

		// Si el examen está bloqueado, lanza un error de conflicto
		if (examen.isBlock) {
			throw boom.conflict('Examen con acceso restringido');
		}

		return examen;
	}

	// Método para actualizar un examen
	async updateExamen(idExamen, changes) {
		const examen = await this.findOneExamen(idExamen);
		const newExamen = await examen.update(changes);
		return newExamen;
	}

	// Método para eliminar un examen
	async deleteExamen(idExamen) {
		const examen = await models.Examen.findByPk(idExamen);
		await examen.destroy();
		return { idExamen };
	}
}

module.exports = ExamenService;
