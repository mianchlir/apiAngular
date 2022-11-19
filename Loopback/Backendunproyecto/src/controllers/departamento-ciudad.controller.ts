import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Departamento,
  Ciudad,
} from '../models';
import {DepartamentoRepository} from '../repositories';

export class DepartamentoCiudadController {
  constructor(
    @repository(DepartamentoRepository)
    public departamentoRepository: DepartamentoRepository,
  ) { }

  @get('/departamentos/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Ciudad belonging to Departamento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ciudad)},
          },
        },
      },
    },
  })
  async getCiudad(
    @param.path.string('id') id: typeof Departamento.prototype.id,
  ): Promise<Ciudad> {
    return this.departamentoRepository.ciudad(id);
  }
}
