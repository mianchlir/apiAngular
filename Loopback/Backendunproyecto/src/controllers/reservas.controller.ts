import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Reservas} from '../models';
import {ReservasRepository} from '../repositories';

export class ReservasController {
  constructor(
    @repository(ReservasRepository)
    public reservasRepository : ReservasRepository,
  ) {}

  @post('/reservas')
  @response(200, {
    description: 'Reservas model instance',
    content: {'application/json': {schema: getModelSchemaRef(Reservas)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reservas, {
            title: 'NewReservas',
            exclude: ['id'],
          }),
        },
      },
    })
    reservas: Omit<Reservas, 'id'>,
  ): Promise<Reservas> {
    return this.reservasRepository.create(reservas);
  }

  @get('/reservas/count')
  @response(200, {
    description: 'Reservas model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Reservas) where?: Where<Reservas>,
  ): Promise<Count> {
    return this.reservasRepository.count(where);
  }

  @get('/reservas')
  @response(200, {
    description: 'Array of Reservas model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Reservas, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Reservas) filter?: Filter<Reservas>,
  ): Promise<Reservas[]> {
    return this.reservasRepository.find(filter);
  }

  @patch('/reservas')
  @response(200, {
    description: 'Reservas PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reservas, {partial: true}),
        },
      },
    })
    reservas: Reservas,
    @param.where(Reservas) where?: Where<Reservas>,
  ): Promise<Count> {
    return this.reservasRepository.updateAll(reservas, where);
  }

  @get('/reservas/{id}')
  @response(200, {
    description: 'Reservas model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Reservas, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Reservas, {exclude: 'where'}) filter?: FilterExcludingWhere<Reservas>
  ): Promise<Reservas> {
    return this.reservasRepository.findById(id, filter);
  }

  @patch('/reservas/{id}')
  @response(204, {
    description: 'Reservas PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reservas, {partial: true}),
        },
      },
    })
    reservas: Reservas,
  ): Promise<void> {
    await this.reservasRepository.updateById(id, reservas);
  }

  @put('/reservas/{id}')
  @response(204, {
    description: 'Reservas PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() reservas: Reservas,
  ): Promise<void> {
    await this.reservasRepository.replaceById(id, reservas);
  }

  @del('/reservas/{id}')
  @response(204, {
    description: 'Reservas DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.reservasRepository.deleteById(id);
  }
}
