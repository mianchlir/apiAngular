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
} from '../models';
import {ZonasRepository} from '../repositories';

export class ZonasPlanesController {
  constructor(
    @repository(ZonasRepository) protected zonasRepository: ZonasRepository,
  ) { }

  @get('/zonas/{id}/planes', {
    responses: {
      '200': {
        description: 'Array of Zonas has many Planes',
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
    return this.zonasRepository.planes(id).find(filter);
  }

  @post('/zonas/{id}/planes', {
    responses: {
      '200': {
        description: 'Zonas model instance',
        content: {'application/json': {schema: getModelSchemaRef(Planes)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Zonas.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Planes, {
            title: 'NewPlanesInZonas',
            exclude: ['id'],
            optional: ['zonasId']
          }),
        },
      },
    }) planes: Omit<Planes, 'id'>,
  ): Promise<Planes> {
    return this.zonasRepository.planes(id).create(planes);
  }

  @patch('/zonas/{id}/planes', {
    responses: {
      '200': {
        description: 'Zonas.Planes PATCH success count',
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
    return this.zonasRepository.planes(id).patch(planes, where);
  }

  @del('/zonas/{id}/planes', {
    responses: {
      '200': {
        description: 'Zonas.Planes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Planes)) where?: Where<Planes>,
  ): Promise<Count> {
    return this.zonasRepository.planes(id).delete(where);
  }
}
