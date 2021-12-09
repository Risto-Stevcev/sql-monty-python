const db = require('better-sqlite3')(':memory:');

/*
  BEDEMIR:  Quiet, quiet.  Quiet!  There are ways of telling whether
      she is a witch.
  BEDEMIR:  Tell me, what do you do with witches?
  VILLAGER #2:  Burn!
  CROWD:  Burn, burn them up!
*/
db.exec(`
  CREATE VIEW witch(x) AS
  SELECT burns.x FROM burns
  JOIN female ON female.x = burns.x
`)

/*
  BEDEMIR:  And what do you burn apart from witches?
  VILLAGER #1:  More witches!
  VILLAGER #2:  Wood!
  BEDEMIR:  So, why do witches burn?
      [pause]
  VILLAGER #3:  B--... 'cause they're made of wood...?
  BEDEMIR:  Good!
  CROWD:  Oh yeah, yeah...
*/
db.exec(`
  CREATE VIEW burns(x) AS
  SELECT x FROM wooden
`)

/*
  BEDEMIR:  So, how do we tell whether she is made of wood?
  VILLAGER #1:  Build a bridge out of her.
  BEDEMIR:  Aah, but can you not also build bridges out of stone?
  VILLAGER #2:  Oh, yeah.
  BEDEMIR:  Does wood sink in water?
  VILLAGER #1:  No, no.
  VILLAGER #2:  It floats!  It floats!
*/
db.exec(`
  CREATE VIEW wooden(x) AS
  SELECT x FROM floats
`)

/*
  BEDEMIR:  What also floats in water?
  VILLAGER #1:  Bread!
  VILLAGER #2:  Apples!
  VILLAGER #3:  Very small rocks!
  VILLAGER #1:  Cider!
  VILLAGER #2:  Great gravy!
  VILLAGER #1:  Cherries!
  VILLAGER #2:  Mud!
  VILLAGER #3:  Churches -- churches!
  VILLAGER #2:  Lead -- lead!
  ARTHUR:  A duck.
  CROWD:  Oooh.
  BEDEMIR:  Exactly!  So, logically...,
  VILLAGER #1:  If... she.. weighs the same as a duck, she's made of wood.
  BEDEMIR:  And therefore--?
  VILLAGER #1:  A witch!
*/
db.exec(`
  CREATE VIEW floats(x) AS 
  SELECT y FROM sameweight WHERE x = 'duck'
`)

/*
  BEDEMIR:  We shall use my larger scales!
      [yelling]
  BEDEMIR:  Right, remove the supports!
      [whop]
      [creak]
  CROWD:  A witch!  A witch!
  WITCH:  It's a fair cop.
  CROWD:  Burn her!  Burn!  [yelling]
*/
db.exec('CREATE TABLE female (x TEXT)')
db.exec('CREATE TABLE sameweight (x TEXT, y TEXT)')
db.prepare('INSERT INTO female(x) VALUES (?)').run('girl') /* By observation */
db.prepare('INSERT INTO sameweight(x, y) VALUES (?, ?)')
  .run('duck', 'girl') /* By experiment */

/* Return a meaningful message from query */
const isWitch = () =>
  db.prepare(`SELECT x FROM witch WHERE x = 'girl'`).all().length > 0
    ? console.log('The girl is a witch')
    : console.log('The girl is not a witch')

if (require.main === module) {
  isWitch()
}
