// import { date, integer } from 'drizzle-orm/pg-core'
// import { text } from 'drizzle-orm/pg-core'
// import { pgTable } from 'drizzle-orm/pg-core'

// export const customers = pgTable('customers', {
//   id: text().primaryKey(),
//   name: text().notNull(),
//   email: text().notNull().unique(),
//   address: text().notNull(),
//   state: text().notNull(),
//   zipCode: text().notNull(),
//   country: text().notNull(),
//   dateOfBirth: date({ mode: 'date' }),
// })