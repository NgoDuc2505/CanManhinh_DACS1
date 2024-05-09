import { Button, Flex } from 'antd'
// import React from 'react'

function ButtonGroupBooking({idUser}) {
    const handleDone = ()=>{
        console.log(idUser)
    }
    const handleDel = ()=>{
        console.log(idUser)
    }
  return (
    <Flex className='gap-2'>
        <Button type='primary' onClick={handleDone}>Xong</Button>
        <Button type='primary' danger onClick={handleDel} >Xóa</Button>
    </Flex>
  )
}

export default ButtonGroupBooking