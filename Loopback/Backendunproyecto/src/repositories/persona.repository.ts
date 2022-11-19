import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MomgodbDataSource} from '../datasources';
import {Persona, PersonaRelations, Planes, Reservas} from '../models';
import {ReservasRepository} from './reservas.repository';
import {PlanesRepository} from './planes.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly planes: HasManyThroughRepositoryFactory<Planes, typeof Planes.prototype.id,
          Reservas,
          typeof Persona.prototype.id
        >;

  constructor(
    @inject('datasources.momgodb') dataSource: MomgodbDataSource, @repository.getter('ReservasRepository') protected reservasRepositoryGetter: Getter<ReservasRepository>, @repository.getter('PlanesRepository') protected planesRepositoryGetter: Getter<PlanesRepository>,
  ) {
    super(Persona, dataSource);
    this.planes = this.createHasManyThroughRepositoryFactoryFor('planes', planesRepositoryGetter, reservasRepositoryGetter,);
    this.registerInclusionResolver('planes', this.planes.inclusionResolver);
  }
}
