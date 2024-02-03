import React, { useEffect, useState, useRef } from 'react'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
//import profile from '../assets/profile.png'
import * as XLSX from 'xlsx'

const icons = [
  {
    id: 0,
    name: 'Dashboard',
    svg: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.53991 2H7.91991C9.32991 2 10.4599 3.15 10.4599 4.561V7.97C10.4599 9.39 9.32991 10.53 7.91991 10.53H4.53991C3.13991 10.53 1.99991 9.39 1.99991 7.97V4.561C1.99991 3.15 3.13991 2 4.53991 2ZM4.53991 13.4697H7.91991C9.32991 13.4697 10.4599 14.6107 10.4599 16.0307V19.4397C10.4599 20.8497 9.32991 21.9997 7.91991 21.9997H4.53991C3.13991 21.9997 1.99991 20.8497 1.99991 19.4397V16.0307C1.99991 14.6107 3.13991 13.4697 4.53991 13.4697ZM19.46 2H16.08C14.67 2 13.54 3.15 13.54 4.561V7.97C13.54 9.39 14.67 10.53 16.08 10.53H19.46C20.86 10.53 22 9.39 22 7.97V4.561C22 3.15 20.86 2 19.46 2ZM16.08 13.4697H19.46C20.86 13.4697 22 14.6107 22 16.0307V19.4397C22 20.8497 20.86 21.9997 19.46 21.9997H16.08C14.67 21.9997 13.54 20.8497 13.54 19.4397V16.0307C13.54 14.6107 14.67 13.4697 16.08 13.4697Z"
          fill="#9A9AA9"
        />
      </svg>
    ),
  },
  {
    id: 1,
    name: 'Upload',
    svg: (
      <svg
        width="20"
        height="23"
        viewBox="0 0 20 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.3304 0H14.6694C18.0704 0 19.9904 2.1243 20.0004 5.86962V16.1552C20.0004 19.8994 18.0704 22.0248 14.6694 22.0248H5.3304C1.9294 22.0248 0.000396729 19.8994 0.000396729 16.1552V5.86962C0.000396729 2.1243 1.9294 0 5.3304 0ZM10.0494 17.4657C10.4804 17.4657 10.8394 17.1133 10.8794 16.6398V5.41811C10.9194 5.07672 10.7704 4.73424 10.5004 4.54813C10.2194 4.36092 9.87939 4.36092 9.61039 4.54813C9.33939 4.73424 9.19039 5.07672 9.21939 5.41811V16.6398C9.27039 17.1133 9.62939 17.4657 10.0494 17.4657ZM14.6504 17.4657C15.0704 17.4657 15.4294 17.1133 15.4804 16.6398V13.0277C15.5094 12.6742 15.3604 12.3449 15.0894 12.1577C14.8204 11.9705 14.4804 11.9705 14.2004 12.1577C13.9294 12.3449 13.7804 12.6742 13.8204 13.0277V16.6398C13.8604 17.1133 14.2194 17.4657 14.6504 17.4657ZM6.21938 16.6398C6.17938 17.1133 5.82038 17.4657 5.38938 17.4657C4.95938 17.4657 4.59938 17.1133 4.56038 16.6398V9.03018C4.53038 8.6877 4.67938 8.34741 4.95038 8.1602C5.21938 7.97299 5.56038 7.97299 5.83038 8.1602C6.09938 8.34741 6.25038 8.6877 6.21938 9.03018V16.6398Z"
          fill="#605BFF"
        />
      </svg>
    ),
  },
  {
    id: 2,
    name: 'Invoice',
    svg: (
      <svg
        width="24"
        height="23"
        viewBox="0 0 24 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.4">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21.7872 7.47427C21.6518 7.61912 21.4681 7.70189 21.2747 7.70189C20.559 7.70189 19.9787 8.32267 19.9787 9.07795C19.9787 9.83841 20.5522 10.4561 21.2611 10.4644C21.6605 10.4685 22 10.7665 22 11.1938V13.8476C22 16.0814 20.3075 17.8931 18.2186 17.8931H15.0658C14.7398 17.8931 14.4758 17.6106 14.4758 17.2619V15.0271C14.4758 14.5926 14.1567 14.2511 13.7505 14.2511C13.354 14.2511 13.0251 14.5926 13.0251 15.0271V17.2619C13.0251 17.6106 12.7611 17.8931 12.4362 17.8931H5.78143C3.70213 17.8931 2 16.0824 2 13.8476V11.1938C2 10.7665 2.33946 10.4685 2.73888 10.4644C3.44874 10.4561 4.02128 9.83841 4.02128 9.07795C4.02128 8.34336 3.46035 7.78466 2.72534 7.78466C2.53191 7.78466 2.34816 7.70189 2.21277 7.55704C2.07737 7.41219 2 7.21561 2 7.00868V4.32897C2 2.09829 3.706 0.273193 5.7911 0.273193H12.4362C12.7611 0.273193 13.0251 0.555649 13.0251 0.904322V3.55299C13.0251 3.97719 13.354 4.32897 13.7505 4.32897C14.1567 4.32897 14.4758 3.97719 14.4758 3.55299V0.904322C14.4758 0.555649 14.7398 0.273193 15.0658 0.273193H18.2186C20.3075 0.273193 22 2.08381 22 4.31862V6.92591C22 7.13284 21.9226 7.32942 21.7872 7.47427ZM13.7505 12.2439C14.1567 12.2439 14.4758 11.8922 14.4758 11.468V7.32942C14.4758 6.90522 14.1567 6.55344 13.7505 6.55344C13.354 6.55344 13.0251 6.90522 13.0251 7.32942V11.468C13.0251 11.8922 13.354 12.2439 13.7505 12.2439Z"
            fill="#030229"
          />
        </g>
      </svg>
    ),
  },
  {
    id: 3,
    name: 'Schedule',
    svg: (
      <svg
        width="24"
        height="27"
        viewBox="0 0 24 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.4">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.81 2.47559H16.191C19.28 2.47559 21 4.4358 21 7.79458V19.1704C21 22.5843 19.28 24.5004 16.191 24.5004H7.81C4.77 24.5004 3 22.5843 3 19.1704V7.79458C3 4.4358 4.77 2.47559 7.81 2.47559ZM8.07999 7.60737V7.59636H11.069C11.5 7.59636 11.85 7.98179 11.85 8.45423C11.85 8.93987 11.5 9.32531 11.069 9.32531H8.07999C7.64899 9.32531 7.29999 8.93987 7.29999 8.46634C7.29999 7.99281 7.64899 7.60737 8.07999 7.60737ZM8.07999 14.3029H15.92C16.35 14.3029 16.7 13.9175 16.7 13.444C16.7 12.9704 16.35 12.5839 15.92 12.5839H8.07999C7.64899 12.5839 7.29999 12.9704 7.29999 13.444C7.29999 13.9175 7.64899 14.3029 8.07999 14.3029ZM8.07999 19.3356H15.92C16.319 19.2915 16.62 18.916 16.62 18.4766C16.62 18.0251 16.319 17.6507 15.92 17.6066H8.07999C7.77999 17.5736 7.48999 17.7278 7.32999 18.0141C7.16999 18.2894 7.16999 18.6528 7.32999 18.9391C7.48999 19.2145 7.77999 19.3796 8.07999 19.3356Z"
            fill="#030229"
          />
        </g>
      </svg>
    ),
  },
  {
    id: 4,
    name: 'Calendar',
    svg: (
      <svg
        width="24"
        height="28"
        viewBox="0 0 24 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.4">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.4109 3.75171L16.4119 4.57722C19.1665 4.81497 20.9862 6.88207 20.9891 10.0521L21 19.3309C21.0039 22.787 19.0322 24.9136 15.8718 24.9191L8.15188 24.9301C5.01119 24.9345 3.01482 22.7573 3.01087 19.2913L3.00001 10.1214C2.99606 6.9305 4.75153 4.86891 7.50617 4.59043L7.50518 3.76492C7.5042 3.28061 7.83001 2.91628 8.26444 2.91628C8.69886 2.91518 9.02468 3.27841 9.02567 3.76271L9.02666 4.5332L14.8914 4.52439L14.8904 3.75391C14.8894 3.2696 15.2152 2.90638 15.6497 2.90528C16.0742 2.90418 16.4099 3.2674 16.4109 3.75171ZM4.52146 10.4615L19.4696 10.4395V10.0543C19.4272 7.68777 18.349 6.44619 16.4138 6.26128L16.4148 7.10881C16.4148 7.5821 16.0801 7.95744 15.6556 7.95744C15.2211 7.95854 14.8943 7.58431 14.8943 7.11101L14.8933 6.21945L9.02862 6.22826L9.0296 7.11871C9.0296 7.59311 8.70477 7.96735 8.27035 7.96735C7.83592 7.96845 7.50912 7.59531 7.50912 7.12091L7.50813 6.27338C5.58284 6.48582 4.51751 7.7318 4.52048 10.1192L4.52146 10.4615ZM15.2399 15.4641V15.4763C15.2498 15.9826 15.625 16.3667 16.0801 16.3557C16.5244 16.3436 16.8789 15.9242 16.869 15.4179C16.8483 14.9336 16.4918 14.5385 16.0485 14.5396C15.5943 14.5506 15.2389 14.9578 15.2399 15.4641ZM16.0554 20.4063C15.6013 20.3952 15.235 19.9781 15.234 19.4718C15.2241 18.9655 15.5884 18.5461 16.0426 18.534H16.0525C16.5165 18.534 16.8927 18.9511 16.8927 19.4685C16.8937 19.9858 16.5185 20.4052 16.0554 20.4063ZM11.1721 15.4818C11.1919 15.9881 11.568 16.3832 12.0222 16.3612C12.4665 16.3381 12.821 15.9198 12.8012 15.4135C12.7903 14.9182 12.425 14.533 11.9807 14.5341C11.5266 14.5561 11.1711 14.9754 11.1721 15.4818ZM12.0261 20.3567C11.572 20.3787 11.1968 19.9836 11.176 19.4773C11.176 18.9709 11.5305 18.5527 11.9847 18.5296C12.429 18.5285 12.7953 18.9137 12.8051 19.4079C12.8259 19.9153 12.4704 20.3336 12.0261 20.3567ZM7.1043 15.5203C7.12405 16.0266 7.50022 16.4228 7.95439 16.3997C8.39869 16.3777 8.75314 15.9584 8.73241 15.452C8.72253 14.9567 8.35722 14.5715 7.91194 14.5726C7.45777 14.5946 7.10332 15.014 7.1043 15.5203ZM7.95836 20.3622C7.50419 20.3853 7.12901 19.9891 7.10827 19.4828C7.10728 18.9765 7.46272 18.5571 7.91689 18.5351C8.36119 18.534 8.72749 18.9192 8.73736 19.4145C8.7581 19.9208 8.40365 20.3402 7.95836 20.3622Z"
            fill="#030229"
          />
        </g>
      </svg>
    ),
  },
  {
    id: 5,
    name: 'Notification',
    svg: (
      <svg
        width="24"
        height="27"
        viewBox="0 0 24 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.4">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.7071 9.81961C18.7071 11.2027 19.039 12.0179 19.7695 12.9573C20.3231 13.6494 20.5 14.5378 20.5 15.5017C20.5 16.4644 20.2128 17.3783 19.6373 18.1203C18.884 19.0098 17.8215 19.5777 16.7372 19.6764C15.1659 19.8239 13.5937 19.9482 12.0005 19.9482C10.4063 19.9482 8.83505 19.8739 7.26375 19.6764C6.17846 19.5777 5.11602 19.0098 4.36367 18.1203C3.78822 17.3783 3.5 16.4644 3.5 15.5017C3.5 14.5378 3.6779 13.6494 4.23049 12.9573C4.98384 12.0179 5.29392 11.2027 5.29392 9.81961V9.35045C5.29392 7.4982 5.71333 6.28703 6.577 5.10137C7.86106 3.37224 9.91935 2.33521 11.9558 2.33521H12.0452C14.1254 2.33521 16.2502 3.42215 17.5125 5.2256C18.3314 6.38685 18.7071 7.547 18.7071 9.35045V9.81961ZM9.07367 22.2245C9.07367 21.67 9.53582 21.416 9.96318 21.3073C10.4631 21.1908 13.5093 21.1908 14.0092 21.3073C14.4365 21.416 14.8987 21.67 14.8987 22.2245C14.8738 22.7525 14.5926 23.2205 14.204 23.5178C13.7001 23.9503 13.1087 24.2243 12.4906 24.323C12.1487 24.3718 11.8128 24.3729 11.4828 24.323C10.8636 24.2243 10.2723 23.9503 9.76937 23.5167C9.37978 23.2205 9.09852 22.7525 9.07367 22.2245Z"
            fill="#030229"
          />
        </g>
      </svg>
    ),
  },
  {
    id: 6,
    name: 'Settings',
    svg: (
      <svg
        width="24"
        height="27"
        viewBox="0 0 24 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.4">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.4023 15.5175C20.7599 15.7268 21.0359 16.0571 21.23 16.3875C21.6082 17.0703 21.5775 17.9072 21.2096 18.645L20.4942 19.9665C20.1161 20.6713 19.411 21.1118 18.6854 21.1118C18.3277 21.1118 17.9291 21.0017 17.6021 20.7815C17.3364 20.5942 17.0298 20.5282 16.7028 20.5282C15.691 20.5282 14.8428 21.4422 14.8121 22.5324C14.8121 23.7989 13.8719 24.79 12.6967 24.79H11.3068C10.1214 24.79 9.18116 23.7989 9.18116 22.5324C9.16072 21.4422 8.3125 20.5282 7.30076 20.5282C6.96351 20.5282 6.65693 20.5942 6.40144 20.7815C6.07441 21.0017 5.66563 21.1118 5.31816 21.1118C4.58235 21.1118 3.8772 20.6713 3.49908 19.9665L2.79393 18.645C2.4158 17.9292 2.39536 17.0703 2.77349 16.3875C2.937 16.0571 3.24359 15.7268 3.59106 15.5175C3.8772 15.3633 4.06116 15.1101 4.23489 14.8127C4.74587 13.8657 4.43928 12.6212 3.57062 12.0596C2.55888 11.4319 2.23185 10.0333 2.81437 8.9431L3.49908 7.64364C4.09181 6.55341 5.35904 6.16797 6.381 6.80669C7.2701 7.33529 8.42491 6.98289 8.94611 6.04684C9.10962 5.73849 9.2016 5.40812 9.18116 5.07774C9.16072 4.64826 9.27314 4.2408 9.46731 3.91043C9.84543 3.22766 10.5301 2.78716 11.2762 2.76514H12.7171C13.4734 2.76514 14.1581 3.22766 14.5362 3.91043C14.7202 4.2408 14.8428 4.64826 14.8121 5.07774C14.7917 5.40812 14.8837 5.73849 15.0472 6.04684C15.5684 6.98289 16.7232 7.33529 17.6225 6.80669C18.6343 6.16797 19.9117 6.55341 20.4942 7.64364L21.1789 8.9431C21.7717 10.0333 21.4447 11.4319 20.4227 12.0596C19.554 12.6212 19.2474 13.8657 19.7686 14.8127C19.9322 15.1101 20.1161 15.3633 20.4023 15.5175ZM9.10962 13.7886C9.10962 15.5175 10.4075 16.8941 12.012 16.8941C13.6165 16.8941 14.8837 15.5175 14.8837 13.7886C14.8837 12.0596 13.6165 10.6721 12.012 10.6721C10.4075 10.6721 9.10962 12.0596 9.10962 13.7886Z"
            fill="#030229"
          />
        </g>
      </svg>
    ),
  },
]

const Upload = ({ loggedIn ,onLogin , profile}) => {
  const navigate=useNavigate();
  const [up, setUp] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [file, setFile] = useState(null)
  const [excelData, setExcelData] = useState([])
  const load = useRef()
  const handleDrop = (e) => {
    e.preventDefault()
    setFile(e.dataTransfer.files[0])
   
  }
  const handleDragOver = (e) => {
    e.preventDefault()
   
  }
  const handleUpload = (e) => {
   
    setFile(e.target.files[0])
   
  }
  useEffect(() => {
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = e.target.result
        const workbook = XLSX.read(data, { type: 'binary' })
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]
        const result = XLSX.utils.sheet_to_json(sheet)
        setExcelData(result)
      }
      reader.readAsBinaryString(file)
      setUp(true)
    } else {
      setExcelData([])
      setUp(false)
    }
  }, [file])

  function handleOut(){
    
    onLogin(false)
    navigate("/")
    
  }

  if (!loggedIn) return <Navigate to="/" />
  return (
    <div className="bg-bgbody flex">
      <div
        className={`bg-[white] w-[300px] lg:w-[218px] h-screen fixed lg:static rounded-r-2xl lg:block ${
          isOpen ? 'block' : 'hide'
        } z-[1] sidebar`}
      >
        <div className="flex gap-[11px] lg:gap-4 ml-5 mt-7 mb-11 lg:my-[51px] lg:ml-14 items-center">
          <svg
            className="size-[26px] lg:size-[42px]"
            viewBox="0 0 42 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M41.9998 21.0966L42 21C42 9.40202 32.598 0 21 0C10.1757 0 1.26409 8.18954 0.123364 18.7105L11.79 24.4142C12.3617 23.6184 13.2953 23.1 14.35 23.1C15.2427 23.1 16.0487 23.4714 16.6219 24.068L25.9002 16.4134C25.9198 14.6906 27.3225 13.3 29.05 13.3C30.6572 13.3 31.9833 14.5037 32.1759 16.0587L41.9998 21.0966ZM17.4857 25.9482L26.5994 18.4294C27.1769 19.1434 28.0601 19.6 29.05 19.6C30.1912 19.6 31.1907 18.9931 31.7433 18.0845L41.8775 23.2815C40.7404 33.8063 31.8271 42 21 42C9.40202 42 0 32.598 0 21C0 20.9588 0.000118391 20.9177 0.000354851 20.8766L11.2016 26.3528C11.2559 28.0449 12.6447 29.4 14.35 29.4C16.0897 29.4 17.5 27.9897 17.5 26.25C17.5 26.1482 17.4952 26.0475 17.4857 25.9482Z"
              fill="#605BFF"
            />
          </svg>
          <h4 className="font-nunito font-semibold text-[20px] lg:text-[24px]">
            Base
          </h4>
          <svg
            className="small ml-[137px] cursor-pointer"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <path
              d="M25.3424 14.6568L19.6855 20.3137M19.6855 20.3137L14.0287 14.6568M19.6855 20.3137L14.0287 25.9706M19.6855 20.3137L25.3424 25.9706"
              stroke="#999CA0"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <ul className="flex flex-col gap-10">
          {icons.map(({ id, name, svg }) => (
            <li key={id} className="flex gap-[14px] ml-[33px] lg:ml-[31px]">
              <div className="w-6 h-7 flex items-center justify-center">
                {svg}
              </div>
              <p className="font-nunito font-semibold flex items-center text-blue">

                {name}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="grow">
        <div className="flex flex-wrap">
          <div className="w-screen h-20 bg-[white] small"></div>
          <div className="fixed left-5 top-[27px] gap-[11px] items-center logo">
            <svg
              className="mr-[5px]"
              onClick={() => setIsOpen(true)}
              width="18"
              height="14"
              viewBox="0 0 18 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1H17M1 13H17M1 7H17"
                stroke="#231F20"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <svg
              className="size-[26px]"
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M41.9998 21.0966L42 21C42 9.40202 32.598 0 21 0C10.1757 0 1.26409 8.18954 0.123364 18.7105L11.79 24.4142C12.3617 23.6184 13.2953 23.1 14.35 23.1C15.2427 23.1 16.0487 23.4714 16.6219 24.068L25.9002 16.4134C25.9198 14.6906 27.3225 13.3 29.05 13.3C30.6572 13.3 31.9833 14.5037 32.1759 16.0587L41.9998 21.0966ZM17.4857 25.9482L26.5994 18.4294C27.1769 19.1434 28.0601 19.6 29.05 19.6C30.1912 19.6 31.1907 18.9931 31.7433 18.0845L41.8775 23.2815C40.7404 33.8063 31.8271 42 21 42C9.40202 42 0 32.598 0 21C0 20.9588 0.000118391 20.9177 0.000354851 20.8766L11.2016 26.3528C11.2559 28.0449 12.6447 29.4 14.35 29.4C16.0897 29.4 17.5 27.9897 17.5 26.25C17.5 26.1482 17.4952 26.0475 17.4857 25.9482Z"
                fill="#605BFF"
              />
            </svg>
            <h4 className="font-nunito font-semibold text-[20px] lg:text-[24px]">
              Base
            </h4>
          </div>
          <div className="fixed top-[27px] right-[21px] lg:top-[50px] lg:right-[30px] flex gap-7 items-center">
            <svg
              width="19"
              height="23"
              viewBox="0 0 19 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.3862 13.3255V9.20108C16.3862 5.5011 14.2012 2.38423 11.2412 1.44687C10.9482 0.59807 10.2322 0 9.38623 0C8.54023 0 7.82423 0.59807 7.53123 1.44687C4.57123 2.38538 2.38623 5.5011 2.38623 9.20108V13.3255L0.679231 15.2887C0.586189 15.3954 0.512401 15.5221 0.462116 15.6617C0.411831 15.8012 0.386041 15.9508 0.386232 16.1019V18.4022C0.386232 18.7072 0.491588 18.9997 0.679125 19.2154C0.866661 19.4311 1.12102 19.5523 1.38623 19.5523H17.3862C17.6514 19.5523 17.9058 19.4311 18.0933 19.2154C18.2809 18.9997 18.3862 18.7072 18.3862 18.4022V16.1019C18.3864 15.9508 18.3606 15.8012 18.3103 15.6617C18.2601 15.5221 18.1863 15.3954 18.0932 15.2887L16.3862 13.3255ZM16.3862 17.252H2.38623V16.578L4.09323 14.6148C4.18627 14.5081 4.26006 14.3814 4.31035 14.2419C4.36063 14.1023 4.38642 13.9527 4.38623 13.8016V9.20108C4.38623 6.03016 6.62923 3.45041 9.38623 3.45041C12.1432 3.45041 14.3862 6.03016 14.3862 9.20108V13.8016C14.3862 14.1076 14.4912 14.3997 14.6792 14.6148L16.3862 16.578V17.252ZM9.38623 23.0027C10.0055 23.0036 10.6097 22.7826 11.1147 22.3703C11.6198 21.9581 12.0006 21.3751 12.2042 20.7024H6.56823C6.77189 21.3751 7.15271 21.9581 7.65774 22.3703C8.16277 22.7826 8.76693 23.0036 9.38623 23.0027Z"
                fill="black"
              />
            </svg>
            <img
              src={profile}
              alt="profile pic"
              className="rounded-full size-[30px]"
              onClick={handleOut}
            />
          </div>
          <div className="flex flex-col">
            <h2 className="font-nunito mt-7 ml-8 lg:mt-[50px] lg:ml-[30px] lg:font-figtree font-bold lg:font-semibold text-[16px] lg:text-2xl">
              Upload CSV
            </h2>
          </div>
        </div>
        <div className="w-[328px] h-[352px] lg:w-[596px] lg:h-[367px] flex flex-col p-4 gap-4 mx-auto mt-6 lg:mt-[137px]">
          <div
            className="w-[296px] h-[258px] lg:w-[564px] border-dashed
            border-[1px] border-[gray] rounded-[8px] flex items-center
            justify-center"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              ref={load}
              type="file"
              style={{ display: 'none' }}
              onChange={handleUpload}
            />
            <div className="w-[182px] lg:w-[267px] h-[76px] gap-4 flex flex-col items-center">
              <div>
                <svg
                  width="37"
                  height="36"
                  viewBox="0 0 37 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_22_2724)">
                    <path
                      d="M22.7801 17.2998L10.9556 15.1998V30.7167C10.9556 31.4253 11.5264 31.9998 12.2305 31.9998H32.6341C33.3382 31.9998 33.9091 31.4253 33.9091 30.7167V24.9998L22.7801 17.2998Z"
                      fill="#185C37"
                    />
                    <path
                      d="M22.7802 4H12.2306C11.5264 4 10.9556 4.57446 10.9556 5.2831V11L22.7802 18L29.0402 20.1L33.9091 18V11L22.7802 4Z"
                      fill="#21A366"
                    />
                    <path
                      d="M10.9556 11H22.7802V18H10.9556V11Z"
                      fill="#107C41"
                    />
                    <path
                      opacity="0.1"
                      d="M19.4185 9.60049H10.9556V27.1005H19.4185C20.1216 27.0982 20.6911 26.5251 20.6934 25.8174V10.8836C20.6911 10.1759 20.1216 9.60279 19.4185 9.60049Z"
                      fill="black"
                    />
                    <path
                      opacity="0.2"
                      d="M18.7229 10.3002H10.9556V27.8002H18.7229C19.4261 27.7979 19.9956 27.2248 19.9978 26.5171V11.5833C19.9956 10.8757 19.4261 10.3025 18.7229 10.3002Z"
                      fill="black"
                    />
                    <path
                      opacity="0.2"
                      d="M18.7229 10.3002H10.9556V26.4002H18.7229C19.4261 26.3979 19.9956 25.8248 19.9978 25.1172V11.5833C19.9956 10.8757 19.4261 10.3025 18.7229 10.3002Z"
                      fill="black"
                    />
                    <path
                      opacity="0.2"
                      d="M18.0273 10.3002H10.9556V26.4002H18.0273C18.7305 26.3979 19.3 25.8248 19.3023 25.1172V11.5833C19.3 10.8757 18.7305 10.3025 18.0273 10.3002Z"
                      fill="black"
                    />
                    <path
                      d="M5.27496 10.3002H18.0274C18.7315 10.3002 19.3023 10.8747 19.3023 11.5833V24.4171C19.3023 25.1258 18.7315 25.7002 18.0274 25.7002H5.27496C4.57082 25.7002 4 25.1258 4 24.4171V11.5833C4 10.8747 4.57082 10.3002 5.27496 10.3002Z"
                      fill="url(#paint0_linear_22_2724)"
                    />
                    <path
                      d="M7.94867 22.1706L10.6307 17.9881L8.17334 13.8287H10.1501L11.4912 16.4887C11.615 16.7414 11.6998 16.929 11.7457 17.0529H11.7631C11.8512 16.8513 11.944 16.6555 12.0413 16.4656L13.4749 13.8301H15.2896L12.7696 17.965L15.3536 22.1706H13.4227L11.8737 19.2509C11.8008 19.1267 11.7388 18.9962 11.6887 18.861H11.6658C11.6204 18.9934 11.5602 19.1203 11.4863 19.239L9.89138 22.1706H7.94867Z"
                      fill="white"
                    />
                    <path
                      d="M32.6342 4H22.7802V11H33.9091V5.2831C33.9091 4.57446 33.3383 4 32.6342 4Z"
                      fill="#33C481"
                    />
                    <path
                      d="M22.7802 18H33.9091V25H22.7802V18Z"
                      fill="#107C41"
                    />
                  </g>
                  <defs>
                    <linearGradient
                      id="paint0_linear_22_2724"
                      x1="6.65832"
                      y1="9.29766"
                      x2="16.7396"
                      y2="26.6473"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#18884F" />
                      <stop offset="0.5" stopColor="#117E43" />
                      <stop offset="1" stopColor="#0B6631" />
                    </linearGradient>
                    <clipPath id="clip0_22_2724">
                      <rect
                        width="29.9091"
                        height="28"
                        fill="white"
                        transform="translate(4 4)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              {file ? (
                <>
                  <p className="font-figtree lg:text-base text-dropdown">
                    {file.name}
                  </p>
                  <button
                    className="text-textwarn font-figtree text-[14px]"
                    onClick={() => {
                      setFile(null)
                      const dataTransfer = new DataTransfer()
                      load.current.files = dataTransfer.files
                    }}
                  >
                    Remove
                  </button>
                </>
              ) : (
                <>
                  <p className="font-figtree lg:text-base text-dropdown large">
                    Drop your excel sheet here or{' '}
                    <button
                      className="text-primary"
                      onClick={() => load.current.click()}
                    >
                      browse
                    </button>
                  </p>
                  <p className="font-figtree text-sm leading-6 text-dropdown small">
                    Upload your excel sheet{' '}
                    <button
                      className="text-primary"
                      onClick={() => load.current.click()}
                    >
                      here
                    </button>
                  </p>
                </>
              )}
            </div>
          </div>
       { up === true? (<button
            className="flex bg-primary h-[46px] lg:h-[56px] items-center justify-center gap-2 rounded-[8px] opacity-50 cursor-not-allowed"
            onClick={() => load.current.click()}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.125 14.1923V16.9327C19.125 18.1435 18.1435 19.125 16.9327 19.125H7.06731C5.85653 19.125 4.875 18.1435 4.875 16.9327V14.1923M12 15.8365V4.875M12 4.875L8.71154 8.16346M12 4.875L15.2885 8.16346"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="font-figtree font-semibold text-[14px] leading-6 text-[white]">
              Upload
            </p>
          </button>):(<button
            className="flex bg-primary h-[46px] lg:h-[56px] items-center justify-center gap-2 rounded-[8px]"
            onClick={() => load.current.click()}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.125 14.1923V16.9327C19.125 18.1435 18.1435 19.125 16.9327 19.125H7.06731C5.85653 19.125 4.875 18.1435 4.875 16.9327V14.1923M12 15.8365V4.875M12 4.875L8.71154 8.16346M12 4.875L15.2885 8.16346"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="font-figtree font-semibold text-[14px] leading-6 text-[white]">
              Upload
            </p>
          </button>)}
        </div>
        {excelData.length > 0 && (
          <div className="mt-12 lg:mt-[104px] ml-6 lg:ml-[84px] flex flex-col gap-[23px] lg:gap-[46px]">
            <h2 className="font-nunito lg:font-figtree font-bold lg:font-semibold text-[16px] lg:text-2xl">
              Uploads
            </h2>
            <div className="bg-bgtable w-[75vw] overflow-scroll">
              <table>
                <thead>
                  <tr className="font-figtree font-semibold text-sm leading-6">
                    <th>Sl No.</th>
                    <th>Links</th>
                    <th>Prefix</th>
                    <th>Select Tags</th>
                    <th>Selected Tags</th>
                  </tr>
                </thead>
                <tbody>
                  {excelData.map((item) => (
                    <tr
                      key={item.id}
                      className="bg-bgrow font-figtree text-sm leading-6 h-[46px] lg:h-[58px]"
                    >
                      <td>{item.id}</td>
                      <td>
                        <a
                          href={'https://' + item.links}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#5B93FF] underline"
                        >
                          {item.links}
                        </a>
                      </td>
                      <td>{item.prefix}</td>
                      <td>{/*item['select tags'].split(',')[0]*/}
                      
                      <select className=" border-2 border-slate-00 px-10 py-2 rounded-sm" >
                            <option>
                              Select Tag---
                            </option>
                            <option >
                             Technology
                            </option>
                            <option >
                             Fashion
                            </option>
                            <option >
                             Food
                            </option>
                            <option >
                             Travel
                            </option>
                            <option >
                             Sports
                            </option>
                            <option >
                             Music
                            </option>
                            <option >
                             Art
                            </option>
                            <option >
                             Health
                            </option>
                            <option >
                             Education
                            </option>
                            <option >
                             Finance
                            </option>
                           
                          </select>
                      
                      
                      
                      
                      
                      
                      
                      
                      </td>
                      <td>{item.selected}
                      
                      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
  Button
</button>
                      
                      
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Upload
