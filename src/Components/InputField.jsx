import React from 'react'

function InputField(props) {
    const {label,value,onChange,placeHolder}=props
  return (
    <>
    <label className="text-lg font-medium text-gray-700" >
        {label}
      </label>
    <input
        className="w-full px-4 py-2 text-lg text-gray-900 placeholder-gray-400 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        type="text"
        id="first-name"
        value={value}
        placeholder={placeHolder}
        onChange={(e) => onChange(e.target.value)}
      />
      </>
  )
}

export default InputField