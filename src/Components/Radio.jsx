import React from 'react'

function Radio(props) {
  const { label, value, onChange, name,img } = props
  return (
    <>
      <div className='flex justify-center items-center'>
        <div className="flex items-center m-1">
          <input
            type="radio"
            name={name}
            id={label}
            value={label}
            checked={value === label}
            onChange={(e) => onChange(e.target.value)}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <label >
          {label}
        </label>
        <img src={img} alt={img} width={'50px'} height={'50px'} style={{borderRadius:'50px'}}/>
      </div>
    </>
  )
}

export default Radio