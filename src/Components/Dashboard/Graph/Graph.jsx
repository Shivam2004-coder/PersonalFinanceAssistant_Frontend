import React from 'react'
import ExpenseVsCat from './ExpenseVsCat'
import ExpenseVsData from './ExpenseVsData'

const Graph = () => {
  return (
    <div className='' >
        <h2 className="text-2xl font-bold text-gray-900">Statistics</h2>
        <div className='my-2' >
            <ExpenseVsCat />
        </div>
        <div className='' >
            <ExpenseVsData />
        </div>

    </div>
  )
}

export default Graph