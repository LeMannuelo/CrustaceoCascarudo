import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (12)</div>
      </div>
      <div className="descriptionbox-description">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc iaculis rutrum hendrerit. Phasellus ut leo urna. Donec in ex eget tellus cursus laoreet. Nam sollicitudin accumsan justo nec elementum. Mauris massa ipsum, mattis eu ante et, elementum accumsan sapien. Morbi dolor ipsum, sagittis ut vehicula at, convallis id massa. Phasellus viverra ullamcorper semper. Aenean sodales tortor odio, at imperdiet tellus cursus at. Donec in urna imperdiet, gravida sem sit amet, commodo metus. Vivamus malesuada, nisl vel laoreet pharetra, risus purus congue dui, vel aliquam mauris risus vitae libero. Nam a blandit ipsum.</p>
        <p>Integer at nulla eget erat cursus imperdiet. Ut mi tellus, gravida non interdum nec, pellentesque at dolor. Pellentesque et maximus nibh. Mauris a augue at purus dignissim iaculis.</p>
      </div>
    </div>
  )
}

export default DescriptionBox
