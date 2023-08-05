import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import MainView from './MainView.vue'

describe('MainView', () => {
  it('should render input correctly', () => {
    const wrapper = mount(MainView, {})
    const input = wrapper.find('input')
    expect(input.exists()).toBeTruthy()
  })
})
