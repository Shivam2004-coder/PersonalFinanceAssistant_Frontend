import React, { useState } from 'react'
import Filter from './Filter'
import UpdateSearch from './UpdateSearch';

const Update = () => {

  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "",
    dateFrom: new Date().toISOString().split("T")[0],
    dateTo: new Date().toISOString().split("T")[0],
  });

  return (
    <div>
      <div>
        <Filter form={form} setForm={setForm} />
      </div>
      <div>
        <UpdateSearch form={form} setForm={setForm} />
      </div>
    </div>
  )
}

export default Update