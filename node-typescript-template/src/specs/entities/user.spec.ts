import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import { QueryFailedError } from 'typeorm'
import { User } from '../../entities/User'
import { AppDataSource } from '../../lib/typeorm'

chai.use(chaiAsPromised)

describe('User', function () {
  before(async function () {
    // TODO: initialise the datasource (database connection)
    await AppDataSource.initialize()
  })
    
  beforeEach(async function () {
    // TODO: drop the content of the user table between each it().
    const dropTableQuery = " DROP TABLE IF EXISTS users"
    await AppDataSource.query((dropTableQuery))
  })

  describe('validations', function () {
    it('should create a new User in database', async function () {
      await AppDataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {firstName: "Michel", lastName: "Jacques", email: "aze@gmail.com", passwordHash: "0000"}
      ])
      .execute()
    })

    it('should raise error if email is missing', async function () {
      // hint to check if a promise fails with chai + chai-as-promise:
      // await chai.expect(promise).to.eventually.be.rejectedWith(QueryFailedError, "message")
      const promise = AppDataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {firstName: "Michel", lastName: "Jacques", passwordHash: "0000"}
      ])
      .execute()

      await chai.expect(promise).to.eventually.be.rejectedWith(QueryFailedError, 'null value in column "email" of relation "user" violates not-null constraint')

    })
  })
})