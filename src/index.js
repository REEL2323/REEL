import ager from 'ager'

const socials = {
  twitter: 'https://twitter.com/reel_2323',
  github: 'https://github.com/REEL2323',
  qiita: 'https://qiita.com/pixel',
  discord: 'REEL#3450',
  steam: 'https://steamcommunity.com/id/REEL2323',
  email: 'voqao.h@gmail.com',
  website: 'https://reel.blue'
}

const birthday = new Date(2002, 11, 17)

export default {
  name: 'REEL',
  sex: 1,
  socials,
  locale: 'Japan.osaka',
  birthday,
  age: ager(birthday)
}
