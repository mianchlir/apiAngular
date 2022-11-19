import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Ciudad,
  Parques,
} from '../models';
import {CiudadRepository} from '../repositories';

export class CiudadParquesController {
  constructor(
    @repository(CiudadRepository)
    public ciudadRepository: CiudadRepository,
  ) { }

  @get('/ciudads/{id}/parques', {
    responses: {
      '200': {
        description: 'Parques belonging to Ciudad',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Parques)},
          },
        },
      },
    },
  })
  async getParques(
    @param.path.string('id') id: typeof Ciudad.prototype.id,
  ): Promise<Parques> {
    return this.ciudadRepository.parques(id);
  }
}
