import { useContext, useEffect, useState } from 'react'
import StoreNavbar from '../../components/StoreNavbar'
import { useNavigate } from 'react-router-dom'
import ProfileSideBar from '../../components/ProfileSideBar'
import ReviewsModal from './ReviewsModal'
import AuthenticationContext from '../../context/authentication'
import LogoutIcon from '@mui/icons-material/Logout'
import Order from './Order'

const ConsumerProfile = () => {
  const navigate = useNavigate()
  const [openReviewModal, setOpenReviewModal] = useState(false)
  const {
    logInData,
    loadingLogInData,
    setLogInData,
    setToken,
    orders,
    setOrders,
    setPageNumberForOrder,
  } = useContext(AuthenticationContext)

  useEffect(() => {
    setOpenReviewModal(true)
  }, [logInData])

  if (loadingLogInData) {
    return <div>Loading</div>
  }

  const profileInformation = {
    ID: logInData.userID!,
    name: logInData.name!,
    locationCoordinates: logInData.locationCoordinates!,
    image: logInData.image!,
    location: logInData.location!,
    mobileNo: logInData.mobileNo!,
  }

  return (
    <>
      <StoreNavbar />
      <ReviewsModal
        openReviewModal={openReviewModal}
        setOpenReviewModal={setOpenReviewModal}
      />
      <div className="md:px-36 px-14 pt-10 mb-32 font-noto">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <div className="text-2xl font-bold ml-2">My Profile</div>
            <button
              className="flex items-center gap-2 hover:cursor-pointer"
              onClick={() => {
                localStorage.removeItem('token')
                setLogInData({ loggedIn: false })
                setToken(null)
                setPageNumberForOrder(1)
                setOrders(null)
                navigate('/sign-in')
              }}
            >
              <LogoutIcon />
              <h3 className="text-xl">Logout</h3>
            </button>
          </div>
          <div className="grid grid-cols-3 gap-10">
            <ProfileSideBar
              isFarmer={false}
              editable={true}
              profileInformation={profileInformation}
            />
            <div className="col-span-2">
              <h1 className="text-lg font-bold mb-5">My Orders</h1>
              {orders ? (
                <div className="flex flex-col gap-10">
                  {orders.map((order, index) => {
                    return <Order key={index} order={order} />
                  })}
                  <div className="flex justify-center">
                    <button
                      className="px-4 py-1 bg-gray-300 rounded-3xl hover:cursor-pointer"
                      onClick={() => {
                        setPageNumberForOrder((prevPageNo) => {
                          return prevPageNo + 1
                        })
                      }}
                    >
                      Load more
                    </button>
                  </div>
                </div>
              ) : (
                <div>No Orders to Display</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConsumerProfile
