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
Zonas,
Planes,
Atracciones,
} from '../models';
import {ZonasRepository} from '../repositories';

export class ZonasAtraccionesController {
  constructor(
    @repository(ZonasRepository) protected zonasRepository: ZonasRepository,
  ) { }

  @get('/zonas/{id}/atracciones', {
    responses: {
      '200': {
        description: 'Array of Zonas has many Atracciones through Planes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Atracciones)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Atracciones>,
  ): Promise<Atracciones[]> {
    return this.zonasRepository.atracciones(id).find(filter);
  }

  @post('/zonas/{id}/atracciones', {
    responses: {
      '200': {
        description: 'create a Atracciones model instance',
        content: {'application/json': {schema: getModelSchemaRef(Atracciones)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Zonas.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atracciones, {
            title: 'NewAtraccionesInZonas',
            exclude: ['id'],
          }),
        },
      },
    }) atracciones: Omit<Atracciones, 'id'>,
  ): Promise<Atracciones> {
    return this.zonasRepository.atracciones(id).create(atracciones);
  }

  @patch('/zonas/{id}/atracciones', {
    responses: {
      '200': {
        description: 'Zonas.Atracciones PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atracciones, {partial: true}),
        },
      },
    })
    atracciones: Partial<Atracciones>,
    @param.query.object('where', getWhereSchemaFor(Atracciones)) where?: Where<Atracciones>,
  ): Promise<Count> {
    return this.zonasRepository.atracciones(id).patch(atracciones, where);
  }

  @del('/zonas/{id}/atracciones', {
    responses: {
      '200': {
        description: 'Zonas.Atracciones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Atracciones)) where?: Where<Atracciones>,
  ): Promise<Count> {
    return this.zonasRepository.atracciones(id).delete(where);
  }
}
