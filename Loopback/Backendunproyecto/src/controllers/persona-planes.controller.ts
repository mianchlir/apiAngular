import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Persona,
Reservas,
Planes,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaPlanesController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/planes', {
    responses: {
      '200': {
        description: 'Array of Persona has many Planes through Reservas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Planes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Planes>,
  ): Promise<Planes[]> {
    return this.personaRepository.planes(id).find(filter);
  }

  @post('/personas/{id}/planes', {
    responses: {
      '200': {
        description: 'create a Planes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Planes)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Planes, {
            title: 'NewPlanesInPersona',
            exclude: ['id'],
          }),
        },
      },
    }) planes: Omit<Planes, 'id'>,
  ): Promise<Planes> {
    return this.personaRepository.planes(id).create(planes);
  }

  @patch('/personas/{id}/planes', {
    responses: {
      '200': {
        description: 'Persona.Planes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Planes, {partial: true}),
        },
      },
    })
    planes: Partial<Planes>,
    @param.query.object('where', getWhereSchemaFor(Planes)) where?: Where<Planes>,
  ): Promise<Count> {
    return this.personaRepository.planes(id).patch(planes, where);
  }

  @del('/personas/{id}/planes', {
    responses: {
      '200': {
        description: 'Persona.Planes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Planes)) where?: Where<Planes>,
  ): Promise<Count> {
    return this.personaRepository.planes(id).delete(where);
  }
}
