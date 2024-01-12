{/* <RemoveModal open={openModal}  onClose={()=>{setOpenModal(false)}/> */}

export const RemoveModal=({open,onclose})=>{
    if(!open) return null
    
    
    return(
        <div onClick={onclose} className="overLay">
            <div onClick={(e)=>{
                e.stopPropagation()
            }} className="modalContainer">
                <img className="remove_img" src="product img" alt="" />
                <div className="modalRight">
                    <p onClick={onclose} className="closeBtn">X</p>
                    <div className="content">
                        <p>You want to delete:</p>
                        <h1>product Title</h1>
                    </div>
                    <div className="btnContainer">
                        <button className="btnYes">
                            <span className="bold">Yes</span>
                        </button>
                        <button className="btnNo">
                            <span className="bold">No</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}