import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'momgodb',
  connector: 'mongodb',
  url: 'mongodb+srv://web:web@grupo4.hocggv5.mongodb.net/mean-rooms',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MomgodbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'momgodb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.momgodb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
