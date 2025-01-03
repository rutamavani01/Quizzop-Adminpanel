import React from 'react'

const Notification = () => {
    return (
        <div className='p-4'>
            <div className='col-12 p-4 d-flex flex-wrap' style={{ backgroundColor: '#191a32', color: 'white', width: '100%', borderRadius: '5px' }}>
                <div className='text-white col-6 p-2'>
                    <form className='w-100' >
                        <div className='text-white col-12 p-2'>
                            <p className='mb-2' style={{ fontSize: '17px' }}>Notification</p>
                            <input
                                type="text"
                                name="notification"
                                // value={quizData.question}
                                // onChange={handleInputChange}
                                className='py-2'
                                style={{
                                    border: '1px solid #6063af',
                                    backgroundColor: 'transparent',
                                    borderRadius: '5px',
                                    width: '100%',
                                    fontSize: '15px',
                                    color: 'white',
                                }}
                            />
                        </div>

                        <div className='text-white col-12 mt-2'>
                            <button
                                type="button"
                                style={{ backgroundColor: '#404380' }}
                                className="btn text-white px-5 waves-effect waves-light text-center d-flex justify-content-start mt-3"
                                // onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Notification