import { useState } from "react";
import UserForm from "./UserForm";
import { getSessionStorageItem } from "../utils/sessionStorageUtils";

const imagePlaceholderUrl = "https://dummyimage.com/800x430/5e917f/morbi-dictum.png&text=jsonplaceholder.org";
const userInfo = getSessionStorageItem('userInfo');
const UserAccount = () => {
  const [isEdit, setIsEdit] = useState(false);
  const onEdit = () => {
    setIsEdit(prevState => !prevState);
  }
  return (
    <div className='container'>
      <h3 className='text-center'>User Account</h3>
      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-primary" onClick={onEdit}>{isEdit ? 'Show user Details' : 'Edit User Details'}</button>
      </div>
      <div className='row justify-content-center'>
        <div className='col-6'>
          {userInfo && !isEdit && <div>
            <img className='w-100' src={imagePlaceholderUrl} style={{ height: '200px' }} alt="..." />
            <div>
              <p><strong>Name: </strong>{userInfo.firstname} {userInfo.lastname}</p>
              <p><strong>Phone: </strong>{userInfo.phone}</p>
              <div><strong>Email: </strong>{userInfo.email}</div>
              <div><strong>Company: </strong>{userInfo.company.name}
              </div>
              <div><strong>Address: </strong>{userInfo.address.street} {userInfo.address.city} {userInfo.address.zipcode}
              </div>
            </div>
          </div>}
        </div>
      </div>
      <div className="mt-3">
        {isEdit && <UserForm />}
      </div>
    </div>
  )
}

export default UserAccount