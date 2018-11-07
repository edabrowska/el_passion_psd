import React from 'react'
import { storiesOf } from '@storybook/react'
import '+/main.sass'

storiesOf('Icons "i-"', module)
  .add('all "i-" icons list', () => (
    <div style={{ margin: '20px' }}>
      <h3>Icons showcase</h3>
      <p>
        Stick to default 21px * n font-size. Icons are created to be pixel perfect at 21px (this size corresponds
        to svg viewBox="0 0 21 21" and the designer sticks to a 21x21 grid within it; if icons are smaller than 21px
        at font-size = 21px, it is intentional and means they have some "padding" within the viewBox).
      </p>
      <div style={{ display: 'flex', marginBottom: 10 }}>
        <div>
          <span className='i-cog' style={{ fontSize: 21, paddingRight: 5 }} />
        </div>
        <div>
          .i-cog
        </div>
      </div>
      <div style={{ display: 'flex', marginBottom: 10 }}>
        <div>
          <span className='i-personalize' style={{ fontSize: 21, paddingRight: 5 }} />
        </div>
        <div>
          .i-personalize
        </div>
      </div>
      <div style={{ display: 'flex', marginBottom: 10 }}>
        <div>
          <span className='i-search' style={{ fontSize: 21, paddingRight: 5 }} />
        </div>
        <div>
          .i-search
        </div>
      </div>
      <div style={{ display: 'flex', marginBottom: 10 }}>
        <div>
          <span className='i-tag' style={{ fontSize: 21, paddingRight: 5 }} />
        </div>
        <div>
          .i-tag
        </div>
      </div>
    </div>
  ))
