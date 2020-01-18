import React from 'react'

import { NavigationRoot } from './Navigation.shards.js'

import Button from '~/components/common/Button'

const colors = ['red', 'yellow', 'green']

const Navigation = () => (
  <NavigationRoot>
    {colors.map((color, i) => <Button key={i} color={color} />)}
  </NavigationRoot>
)

export default Navigation
