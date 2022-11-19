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
  Planes,
  //Planes,
} from '../models';
import {PlanesRepository} from '../repositories';

export class PlanesPlanesController {
  constructor(
    @repository(PlanesRepository) protected planesRepository: PlanesRepository,
  ) { }

  @get('/planes/{id}/planes', {
    responses: {
      '200': {
        description: 'Planes has one Planes',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Planes),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Planes>,
  ): Promise<Planes> {
    return this.planesRepository.planes(id).get(filter);
  }

  @post('/planes/{id}/planes', {
    responses: {
      '200': {
        description: 'Planes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Planes)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Planes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Planes, {
            title: 'NewPlanesInPlanes',
            exclude: ['id'],
            optional: ['planesId']
          }),
        },
      },
    }) planes: Omit<Planes, 'id'>,
  ): Promise<Planes> {
    return this.planesRepository.planes(id).create(planes);
  }

  @patch('/planes/{id}/planes', {
    responses: {
      '200': {
        description: 'Planes.Planes PATCH success count',
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
    return this.planesRepository.planes(id).patch(planes, where);
  }

  @del('/planes/{id}/planes', {
    responses: {
      '200': {
        description: 'Planes.Planes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Planes)) where?: Where<Planes>,
  ): Promise<Count> {
    return this.planesRepository.planes(id).delete(where);
  }
}
