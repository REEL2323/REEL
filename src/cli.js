#!/usr/bin/env node
'use strict'
import path from 'path'
import open from 'open'
import capitalize from 'lodash.capitalize'
import React, { Component } from 'react'
import termImg from 'term-img'
import terminalImage from 'terminal-image'
import { render, Text, Box, Color } from 'ink'
import SelectInput from 'ink-select-input'

import reel from './index'

const links = Object.entries(reel.socials)
  .filter(({ 0: key }) => !['steam', 'email', 'discord'].includes(key))
  .sort((a, b) => {
    if (a[0] === 'website') return -1
    if (b[0] === 'website') return 1
    return 0
  })
  .map(({ 0: key, 1: link }, i = 0) => {
    i++
    return {
      key: i,
      label: capitalize(key),
      value: link
    }
  })

links.push({
  key: 5,
  label: 'Quit',
  action() {
    process.exit()
  }
})

const handleSelect = item => {
  if (item.value) {
    open(item.value)
  }
  if (item.action) {
    item.action()
  }
}

console.log('\n')

const fallback = async () => {
  const image = await terminalImage.file(path.join(__dirname, 'voq.png'))
  console.log(image)
}

termImg(path.join(__dirname, 'voq.png'), { fallback, width: 100 })

class UI extends Component {
  render() {
    return (
      <div>
        <Box flexDirection="column" alignItems="center">
          <Box flexDirection="column" alignItems="center" margin={1}>
            <Text bold italic>
              Webdesign, Frontend, CssAnimation, Keyboard
            </Text>
          </Box>
          <Box alignItems="flex-start" martginBottom={2}>
            <SelectInput items={links} onSelect={handleSelect} key={this.key} />
            <Box flexDirection="column" marginLeft={6}>
              {[
                { key: 'name', value: reel.name },
                {
                  key: 'sex',
                  value: (s => {
                    switch (s) {
                      case 1:
                        return 'male'
                      case 2:
                        return 'female'
                      default:
                        return 'other'
                    }
                  })(reel.sex)
                },
                { key: 'locale', value: reel.locale },
                { key: 'age', value: reel.age },
                {
                  key: 'birthday',
                  value: (date =>
                    `${date.getFullYear()}/${date.getMonth() +
                      1}/${date.getDate()}`)(reel.birthday)
                }
              ].map(({ key, value }) => (
                <Box key={key} justifyContent="space-between">
                  <Box marginRight={2}>
                    <Text>{key}</Text>
                  </Box>
                  <Box flexGrow={2} justifyContent="flex-end">
                    <Box>
                      <Color cyan>{value}</Color>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </div>
    )
  }
}

render(<UI />)
