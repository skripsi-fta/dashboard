import {
    type LucideProps,
    Moon,
    SunMedium,
    Twitter,
    Linkedin,
    Menu,
    Instagram,
    Monitor,
    QrCode,
    File
} from 'lucide-react';
import type { ReactNode } from 'react';

export const Icons = {
    sun: SunMedium,
    moon: Moon,
    twitter: Twitter,
    linkedIn: Linkedin,
    menu: Menu,
    instagram: Instagram,
    report: (props: LucideProps) => <File {...props} />,
    monitor: (props: LucideProps) => <Monitor {...props} />,
    qr: (props: LucideProps) => <QrCode {...props} />,
    people: (props: LucideProps) =>
        (
            <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                stroke-width='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                {...props}
            >
                <path d='M14 19a6 6 0 0 0-12 0' />
                <circle cx='8' cy='9' r='4' />
                <path d='M22 19a6 6 0 0 0-6-6 4 4 0 1 0 0-8' />
            </svg>
        ) as ReactNode,
    logo: (props: LucideProps) =>
        (
            <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                {...props}
            >
                <path
                    fill='currentColor'
                    d='M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z'
                />
            </svg>
        ) as ReactNode,
    gitHub: (props: LucideProps) =>
        (
            <svg viewBox='0 0 438.549 438.549' {...props}>
                <path
                    fill='currentColor'
                    d='M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z'
                ></path>
            </svg>
        ) as ReactNode,
    doctor: (props: LucideProps) =>
        (
            <svg
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                {...props}
            >
                <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M15.5556 5.55556C15.5556 8.62389 13.0683 11.1111 10 11.1111C6.93167 11.1111 4.44444 8.62389 4.44444 5.55556C4.44444 2.48722 6.93167 0 10 0C13.0683 0 15.5556 2.48722 15.5556 5.55556ZM14.4444 5.55556C14.4444 6.7343 13.9762 7.86476 13.1427 8.69825C12.3092 9.53175 11.1787 10 10 10C8.82126 10 7.6908 9.53175 6.8573 8.69825C6.02381 7.86476 5.55556 6.7343 5.55556 5.55556C5.55556 4.37682 6.02381 3.24635 6.8573 2.41286C7.6908 1.57936 8.82126 1.11111 10 1.11111C11.1787 1.11111 12.3092 1.57936 13.1427 2.41286C13.9762 3.24635 14.4444 4.37682 14.4444 5.55556ZM6.61889 12.6972L6.625 12.7094L6.66667 12.7911H13.1939C13.3211 12.55 13.6094 12.1656 13.8889 12.2294C14.5167 12.3722 15.1489 12.5711 15.7561 12.8161L15.7744 12.8072L15.7806 12.8194L15.785 12.8278C18.0711 13.7567 20 15.3311 20 16.9833V20H0V16.9833C0 14.8861 3.10889 12.9128 6.11111 12.2294C6.35611 12.1739 6.50167 12.4628 6.61889 12.6972ZM14.8356 13.6572C14.5973 13.5737 14.3562 13.4982 14.1128 13.4311L13.865 13.9022H5.99611L5.76611 13.465L5.56611 13.525C5.56204 13.5613 5.55907 13.6028 5.55722 13.6494C5.55 13.8411 5.56444 14.0683 5.59611 14.2994C5.6284 14.5405 5.68043 14.7785 5.75167 15.0111C6.14193 15.0573 6.50329 15.24 6.77195 15.5268C7.04061 15.8136 7.19928 16.1862 7.21994 16.5786C7.2406 16.971 7.12191 17.3582 6.88485 17.6716C6.64778 17.985 6.30759 18.2046 5.92434 18.2916C5.54109 18.3785 5.13944 18.3272 4.79032 18.1468C4.44121 17.9664 4.16709 17.6684 4.01636 17.3054C3.86564 16.9425 3.84801 16.538 3.9666 16.1633C4.08518 15.7886 4.33235 15.4679 4.66444 15.2578L4.66 15.2422C4.58581 14.9825 4.53067 14.7177 4.495 14.45C4.47144 14.279 4.45587 14.1069 4.44833 13.9344C3.76167 14.2278 3.12111 14.5822 2.58444 14.9733C1.51667 15.7533 1.11111 16.4822 1.11111 16.9833V18.8889H18.8889V16.9833C18.8889 16.4817 18.4833 15.7528 17.4156 14.9739C16.9499 14.6392 16.4541 14.3487 15.9344 14.1061C15.9117 14.4072 15.8657 14.7061 15.7967 15H16.1111C16.2143 15.0001 16.3153 15.0288 16.4031 15.0831C16.4908 15.1373 16.5617 15.215 16.6078 15.3072L17.1633 16.4183C17.2022 16.4956 17.2222 16.5806 17.2222 16.6667V17.7778C17.2222 17.9251 17.1637 18.0664 17.0595 18.1706C16.9553 18.2748 16.814 18.3333 16.6667 18.3333H15.5556V17.2222H16.1111V16.7978L15.7678 16.1111H14.2322L13.8889 16.7978V17.2222H14.4444V18.3333H13.3333C13.186 18.3333 13.0447 18.2748 12.9405 18.1706C12.8363 18.0664 12.7778 17.9251 12.7778 17.7778V16.6667C12.7778 16.5806 12.7978 16.4956 12.8367 16.4183L13.3922 15.3072C13.4383 15.215 13.5092 15.1373 13.5969 15.0831C13.6847 15.0288 13.7857 15.0001 13.8889 15H14.6456L14.6661 14.9311C14.7183 14.7528 14.765 14.5311 14.7967 14.3C14.8278 14.0711 14.8422 13.8472 14.8356 13.6572ZM6.11111 16.6667C6.11111 16.9856 5.85444 17.2306 5.55556 17.2306C5.25667 17.2306 5 16.9861 5 16.6667C5 16.3478 5.25667 16.1028 5.55556 16.1028C5.85444 16.1028 6.11111 16.3472 6.11111 16.6667Z'
                    fill='black'
                />
            </svg>
        ) as ReactNode,
    pharmacy: (props: LucideProps) =>
        (
            <svg
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                {...props}
            >
                <path
                    d='M11.6667 3.88897V2.77786H10.5556V1.66675H9.44445V2.77786H8.33334V3.88897H9.44445V5.00008H10.5556V3.88897H11.6667Z'
                    fill='black'
                />
                <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M14.0667 5.98167L15.1655 2.86722C15.4633 2.02278 15.0389 1.06722 14.1494 0.785556C13.1167 0.457778 11.4278 0 9.99999 0C8.57221 0 6.88332 0.457778 5.84999 0.785556C4.9611 1.06778 4.53666 2.02333 4.83443 2.86722L5.93388 5.98167C5.63544 6.65821 5.51052 7.39853 5.57044 8.13555C5.63035 8.87256 5.87321 9.58298 6.27701 10.2024C6.6808 10.8219 7.23278 11.3308 7.88292 11.6831C8.53306 12.0354 9.26082 12.2199 10.0003 12.2199C10.7397 12.2199 11.4675 12.0354 12.1176 11.6831C12.7678 11.3308 13.3197 10.8219 13.7235 10.2024C14.1273 9.58298 14.3702 8.87256 14.4301 8.13555C14.49 7.39853 14.3651 6.65821 14.0667 5.98167ZM9.99999 1.11111C8.75555 1.11111 7.2061 1.52111 6.1861 1.84444C5.93055 1.92556 5.78055 2.21 5.88221 2.49778L7.00666 5.68333C8.99943 5.05 11.0005 5.05 12.9933 5.68333L14.1178 2.49778C14.2194 2.21 14.0694 1.92556 13.8139 1.845C12.7939 1.52111 11.2439 1.11111 9.99999 1.11111ZM13.2255 6.93389C13.196 6.92792 13.1665 6.91956 13.1383 6.90889C11.0417 6.12278 8.95832 6.12278 6.86166 6.90889C6.83331 6.91959 6.80414 6.92795 6.77444 6.93389C6.64614 7.42675 6.63249 7.94245 6.73452 8.4414C6.83655 8.94036 7.05155 9.4093 7.36302 9.81223C7.67449 10.2152 8.07415 10.5414 8.53131 10.7658C8.98848 10.9902 9.49099 11.1069 10.0003 11.1069C10.5096 11.1069 11.0121 10.9902 11.4692 10.7658C11.9264 10.5414 12.326 10.2152 12.6375 9.81223C12.949 9.4093 13.164 8.94036 13.266 8.4414C13.3681 7.94245 13.3538 7.42675 13.2255 6.93389Z'
                    fill='black'
                />
                <path
                    d='M15.5556 15.5554H16.6667V16.6666H15.5556V17.7777H14.4445V16.6666H13.3333V15.5554H14.4445V14.4443H15.5556V15.5554Z'
                    fill='black'
                />
                <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M6.04389 12.2224C6.04389 12.2224 0 14.1074 0 16.3707V20.0002H20V16.3707C20 14.1074 13.9561 12.2224 13.9561 12.2224L10.6383 14.5519C10.4513 14.6831 10.2284 14.7535 10 14.7535C9.77155 14.7535 9.54865 14.6831 9.36167 14.5519L6.04389 12.2224ZM14.1339 13.4557L11.2772 15.4613C10.9032 15.7239 10.4573 15.8648 10.0003 15.8648C9.54326 15.8648 9.09736 15.7239 8.72333 15.4613L5.86611 13.4557C5.06419 13.7371 4.27998 14.0666 3.51778 14.4424C2.79778 14.8013 2.13889 15.1996 1.67556 15.6046C1.175 16.0419 1.11111 16.3019 1.11111 16.3707V18.8891H18.8889V16.3707C18.8889 16.3019 18.825 16.0419 18.3244 15.6041C17.8611 15.1996 17.2022 14.8013 16.4817 14.4419C15.8396 14.1257 15.1819 13.8423 14.5111 13.593C14.3719 13.5411 14.2461 13.4957 14.1339 13.4557Z'
                    fill='black'
                />
            </svg>
        ) as ReactNode,
    cashier: (props: LucideProps) =>
        (
            <svg
                width='21'
                height='21'
                viewBox='0 0 21 21'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                {...props}
            >
                <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M8.95031 2.97534L10.9379 4.95065V5.93831C10.9386 6.70957 10.6368 7.45073 10.0964 8.0043C9.55601 8.55787 8.81974 8.88022 8.04401 8.90286C7.26829 8.92549 6.51426 8.64662 5.94214 8.12551C5.37002 7.6044 5.02491 6.88212 4.98013 6.11214L4.97516 4.95065L8.95031 2.97534Z'
                    stroke='black'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
                <path
                    d='M2.98758 10.3827V5.93828C2.98758 4.62857 3.51109 3.3725 4.44295 2.44639C5.37481 1.52028 6.63868 1 7.95652 1C9.27437 1 10.5382 1.52028 11.4701 2.44639C12.402 3.3725 12.9255 4.62857 12.9255 5.93828V10.3827'
                    stroke='black'
                    strokeLinejoin='round'
                />
                <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M14.913 14.8271V14.108C14.913 10.9604 11.2499 8.90112 7.95652 8.90112C4.66311 8.90112 1 10.9604 1 14.108V14.8271C1 15.089 1.1047 15.3402 1.29107 15.5254C1.47745 15.7107 1.73022 15.8147 1.99379 15.8147H13.9193C14.1828 15.8147 14.4356 15.7107 14.622 15.5254C14.8083 15.3402 14.913 15.089 14.913 14.8271Z'
                    stroke='black'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
                <g clip-path='url(#clip0_938_3707)'>
                    <path
                        d='M17.0147 16.679H11.9418C10.7538 16.679 10.1598 16.679 9.73857 16.9723C9.58313 17.0803 9.44726 17.2153 9.33857 17.3698C9.04346 17.7884 9.04346 18.3788 9.04346 19.5595C9.04346 20.1498 9.04346 20.4453 9.19074 20.6543C9.24545 20.7325 9.3123 20.7989 9.39128 20.8536C9.60161 21 9.89889 21 10.4929 21H18.4636C19.0576 21 19.3549 21 19.5652 20.8536C19.6438 20.7989 19.7107 20.7325 19.7657 20.6543C19.913 20.4453 19.913 20.1498 19.913 19.5595C19.913 18.3788 19.913 17.7884 19.6179 17.3698C19.5092 17.2153 19.3733 17.0803 19.2179 16.9723C18.7967 16.679 18.2027 16.679 17.0147 16.679ZM18.8261 16.679L18.6049 14.7005C18.4516 13.3297 18.375 12.6437 17.9108 12.2311C17.4456 11.8179 16.7522 11.8179 15.3641 11.8179H13.5924C12.2043 11.8179 11.5103 11.8179 11.0456 12.2311C10.5815 12.6437 10.5049 13.3297 10.3516 14.7005L10.1304 16.679M14.2065 10.1975H15.5652H14.2065ZM16.9239 10.1975H15.5652H16.9239ZM15.5652 10.1975V11.8179V10.1975Z'
                        fill='white'
                    />
                    <path
                        d='M18.8261 16.679L18.6049 14.7005C18.4516 13.3297 18.375 12.6437 17.9108 12.2311C17.4456 11.8179 16.7522 11.8179 15.3641 11.8179H13.5924C12.2043 11.8179 11.5103 11.8179 11.0456 12.2311C10.5815 12.6437 10.5049 13.3297 10.3516 14.7005L10.1304 16.679M14.2065 10.1975H15.5652M15.5652 10.1975H16.9239M15.5652 10.1975V11.8179M17.0147 16.679H11.9418C10.7538 16.679 10.1598 16.679 9.73857 16.9723C9.58313 17.0803 9.44726 17.2153 9.33857 17.3698C9.04346 17.7884 9.04346 18.3788 9.04346 19.5595C9.04346 20.1498 9.04346 20.4453 9.19074 20.6543C9.24545 20.7325 9.3123 20.7989 9.39128 20.8536C9.60161 21 9.89889 21 10.4929 21H18.4636C19.0576 21 19.3549 21 19.5652 20.8536C19.6438 20.7989 19.7107 20.7325 19.7657 20.6543C19.913 20.4453 19.913 20.1498 19.913 19.5595C19.913 18.3788 19.913 17.7884 19.6179 17.3698C19.5092 17.2153 19.3733 17.0803 19.2179 16.9723C18.7967 16.679 18.2027 16.679 17.0147 16.679Z'
                        stroke='black'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                    <path
                        d='M12.8478 18.5694L13.3891 18.9281C13.5677 19.0464 13.7777 19.1096 13.9924 19.1095H14.9641C15.1788 19.1096 15.3887 19.0464 15.5674 18.9281L16.1087 18.5694M12.3043 13.4382H13.3913H12.3043Z'
                        fill='white'
                    />
                    <path
                        d='M12.8478 18.5694L13.3891 18.9281C13.5677 19.0464 13.7777 19.1096 13.9924 19.1095H14.9641C15.1788 19.1096 15.3887 19.0464 15.5674 18.9281L16.1087 18.5694M12.3043 13.4382H13.3913'
                        stroke='black'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                </g>
                <defs>
                    <clipPath id='clip0_938_3707'>
                        <rect
                            width='13.0435'
                            height='12.963'
                            fill='white'
                            transform='translate(7.95651 8.03711)'
                        />
                    </clipPath>
                </defs>
            </svg>
        ) as ReactNode,
    management: (props: LucideProps) =>
        (
            <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                {...props}
            >
                <path
                    d='M12 23C6.443 21.765 2 16.522 2 11V5L12 1L22 5V11C22 16.524 17.557 21.765 12 23ZM4 6V11C4.05715 13.3121 4.87036 15.5418 6.31518 17.3479C7.75999 19.1539 9.75681 20.4367 12 21C14.2432 20.4367 16.24 19.1539 17.6848 17.3479C19.1296 15.5418 19.9429 13.3121 20 11V6L12 3L4 6Z'
                    fill='black'
                />
                <path
                    d='M12 11C13.3807 11 14.5 9.88071 14.5 8.5C14.5 7.11929 13.3807 6 12 6C10.6193 6 9.5 7.11929 9.5 8.5C9.5 9.88071 10.6193 11 12 11Z'
                    fill='black'
                />
                <path
                    d='M7 15C7.49273 15.8983 8.21539 16.6496 9.09398 17.1767C9.97256 17.7039 10.9755 17.988 12 18C13.0245 17.988 14.0274 17.7039 14.906 17.1767C15.7846 16.6496 16.5073 15.8983 17 15C16.975 13.104 13.658 12 12 12C10.333 12 7.025 13.104 7 15Z'
                    fill='black'
                />
            </svg>
        ) as ReactNode,
    dokterJanjiTemu: ({ stroke, ...props }: LucideProps) =>
        (
            <svg
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                {...props}
            >
                <path
                    d='M4.88889 6.6H11.1111M4.88889 9.4H11.1111M4.88889 12.2H8M4.88889 2.4C4.88889 3.1732 5.58534 3.8 6.44444 3.8H9.55556C10.4147 3.8 11.1111 3.1732 11.1111 2.4M4.88889 2.4C4.88889 1.6268 5.58534 1 6.44444 1H9.55556C10.4147 1 11.1111 1.6268 11.1111 2.4M4.88889 2.4H4.11111C2.39289 2.4 1 3.6536 1 5.2V12.2C1 13.7464 2.39289 15 4.11111 15H11.8889C13.6071 15 15 13.7464 15 12.2V5.2C15 3.6536 13.6071 2.4 11.8889 2.4H11.1111'
                    stroke={stroke}
                    strokeLinecap='round'
                />
            </svg>
        ) as ReactNode,
    dokterJadwal: ({ stroke, ...props }: LucideProps) =>
        (
            <svg
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                {...props}
            >
                <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M1 6.25V12.2C1 13.7464 2.2536 15 3.8 15H12.2C13.7464 15 15 13.7464 15 12.2V6.25H1ZM1 5.2H15V3.8C15 2.2536 13.7464 1 12.2 1H3.8C2.2536 1 1 2.2536 1 3.8V5.2ZM12.9 3.1C12.9 3.4866 12.5866 3.8 12.2 3.8C11.8134 3.8 11.5 3.4866 11.5 3.1C11.5 2.7134 11.8134 2.4 12.2 2.4C12.5866 2.4 12.9 2.7134 12.9 3.1ZM9.4 3.8C9.7866 3.8 10.1 3.4866 10.1 3.1C10.1 2.7134 9.7866 2.4 9.4 2.4C9.0134 2.4 8.7 2.7134 8.7 3.1C8.7 3.4866 9.0134 3.8 9.4 3.8Z'
                    stroke={stroke}
                    strokeLinecap='round'
                />
            </svg>
        ) as ReactNode,
    farmasiAntrian: ({ stroke, ...props }: LucideProps) => (
        <svg
            width='14'
            height='14'
            viewBox='0 0 14 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <path
                d='M2.1 2.8C1.33 2.8 0.7 3.43 0.7 4.2C0.7 4.97 1.33 5.6 2.1 5.6C2.87 5.6 3.5 4.977 3.5 4.2C3.5 3.423 2.877 2.8 2.1 2.8ZM7 1.4C6.72311 1.4 6.45243 1.48211 6.2222 1.63594C5.99197 1.78978 5.81253 2.00843 5.70657 2.26424C5.60061 2.52006 5.57288 2.80155 5.6269 3.07313C5.68092 3.3447 5.81426 3.59416 6.01005 3.78995C6.20584 3.98574 6.4553 4.11908 6.72687 4.1731C6.99845 4.22712 7.27994 4.19939 7.53576 4.09343C7.79157 3.98747 8.01022 3.80803 8.16406 3.5778C8.31789 3.34757 8.4 3.07689 8.4 2.8C8.4 2.023 7.777 1.4 7 1.4ZM11.9 0C11.13 0 10.5 0.63 10.5 1.4C10.5 2.17 11.13 2.8 11.9 2.8C12.67 2.8 13.3 2.177 13.3 1.4C13.3 0.623 12.677 0 11.9 0ZM1.05 6.3C0.469 6.3 0 6.769 0 7.35V10.5H0.7V14H3.5V10.5H4.2V7.35C4.2 6.769 3.731 6.3 3.15 6.3H1.05ZM5.95 4.9C5.369 4.9 4.9 5.369 4.9 5.95V9.1H5.6V12.6H8.4V9.1H9.1V5.95C9.1 5.369 8.631 4.9 8.05 4.9H5.95ZM10.85 3.5C10.269 3.5 9.8 3.969 9.8 4.55V7.7H10.5V11.2H13.3V7.7H14V4.55C14 3.969 13.531 3.5 12.95 3.5H10.85Z'
                fill={stroke}
            />
        </svg>
    ),
    kasirPembayaran: ({ stroke, ...props }: LucideProps) => (
        <svg
            width='14'
            height='14'
            viewBox='0 0 14 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <path
                d='M7.875 5.6875C7.875 5.57147 7.82891 5.46019 7.74686 5.37814C7.66481 5.29609 7.55353 5.25 7.4375 5.25H3.9375C3.82147 5.25 3.71019 5.29609 3.62814 5.37814C3.54609 5.46019 3.5 5.57147 3.5 5.6875C3.5 5.80353 3.54609 5.91481 3.62814 5.99686C3.71019 6.07891 3.82147 6.125 3.9375 6.125H7.4375C7.55353 6.125 7.66481 6.07891 7.74686 5.99686C7.82891 5.91481 7.875 5.80353 7.875 5.6875ZM7.29167 7.4375C7.29167 7.32147 7.24557 7.21019 7.16353 7.12814C7.08148 7.04609 6.9702 7 6.85417 7H3.9375C3.82147 7 3.71019 7.04609 3.62814 7.12814C3.54609 7.21019 3.5 7.32147 3.5 7.4375C3.5 7.55353 3.54609 7.66481 3.62814 7.74686C3.71019 7.82891 3.82147 7.875 3.9375 7.875H6.85417C6.9702 7.875 7.08148 7.82891 7.16353 7.74686C7.24557 7.66481 7.29167 7.55353 7.29167 7.4375ZM7.4375 8.75C7.55353 8.75 7.66481 8.79609 7.74686 8.87814C7.82891 8.96019 7.875 9.07147 7.875 9.1875C7.875 9.30353 7.82891 9.41481 7.74686 9.49686C7.66481 9.57891 7.55353 9.625 7.4375 9.625H3.9375C3.82147 9.625 3.71019 9.57891 3.62814 9.49686C3.54609 9.41481 3.5 9.30353 3.5 9.1875C3.5 9.07147 3.54609 8.96019 3.62814 8.87814C3.71019 8.79609 3.82147 8.75 3.9375 8.75H7.4375Z'
                fill={stroke}
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M3.5 12.6874H11.0833C11.5088 12.6874 11.9168 12.5184 12.2177 12.2176C12.5185 11.9167 12.6875 11.5087 12.6875 11.0833V7.87493C12.6875 7.75889 12.6414 7.64761 12.5594 7.56557C12.4773 7.48352 12.366 7.43743 12.25 7.43743H10.3542V2.88334C10.3542 2.05326 9.41558 1.57026 8.74008 2.05268L8.638 2.12559C8.41446 2.28428 8.14701 2.36933 7.87288 2.36891C7.59874 2.36849 7.33155 2.28262 7.1085 2.12326C6.73611 1.85823 6.2904 1.71582 5.83333 1.71582C5.37627 1.71582 4.93055 1.85823 4.55817 2.12326C4.33511 2.28262 4.06792 2.36849 3.79379 2.36891C3.51965 2.36933 3.25221 2.28428 3.02867 2.12559L2.92658 2.05268C2.25108 1.57026 1.3125 2.05268 1.3125 2.88334V10.4999C1.3125 11.0801 1.54297 11.6365 1.9532 12.0467C2.36344 12.457 2.91984 12.6874 3.5 12.6874ZM5.06683 2.83493C5.2908 2.67594 5.55867 2.59053 5.83333 2.59053C6.108 2.59053 6.37586 2.67594 6.59983 2.83493C6.97124 3.10041 7.41624 3.24339 7.87278 3.24391C8.32932 3.24443 8.77465 3.10248 9.14667 2.83784L9.24875 2.76493C9.27054 2.74942 9.29617 2.74019 9.32284 2.73827C9.34952 2.73635 9.37621 2.74179 9.39999 2.75402C9.42378 2.76624 9.44375 2.78477 9.45771 2.80758C9.47167 2.83039 9.4791 2.8566 9.47917 2.88334V11.0833C9.47917 11.3458 9.54217 11.5937 9.65417 11.8124H3.5C3.1519 11.8124 2.81806 11.6741 2.57192 11.428C2.32578 11.1819 2.1875 10.848 2.1875 10.4999V2.88334C2.18757 2.8566 2.19499 2.83039 2.20896 2.80758C2.22292 2.78477 2.24289 2.76624 2.26667 2.75402C2.29046 2.74179 2.31715 2.73635 2.34382 2.73827C2.3705 2.74019 2.39613 2.74942 2.41792 2.76493L2.52 2.83784C2.89202 3.10248 3.33734 3.24443 3.79388 3.24391C4.25042 3.24339 4.69542 3.10041 5.06683 2.83493ZM10.3542 11.0833V8.31243H11.8125V11.0833C11.8125 11.2766 11.7357 11.4621 11.5989 11.5989C11.4622 11.7356 11.2767 11.8124 11.0833 11.8124C10.8899 11.8124 10.7045 11.7356 10.5677 11.5989C10.431 11.4621 10.3542 11.2766 10.3542 11.0833Z'
                fill={stroke}
            />
        </svg>
    ),
    kasirAntrian: ({ stroke, ...props }: LucideProps) => (
        <svg
            width='14'
            height='14'
            viewBox='0 0 14 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <path
                d='M1.2 10.5V10H0.7H0.5V7.35C0.5 7.04514 0.745143 6.8 1.05 6.8H3.15C3.45486 6.8 3.7 7.04514 3.7 7.35V10H3.5H3V10.5V13.5H1.2V10.5ZM6.1 9.1V8.6H5.6H5.4V5.95C5.4 5.64514 5.64514 5.4 5.95 5.4H8.05C8.35486 5.4 8.6 5.64514 8.6 5.95V8.6H8.4H7.9V9.1V12.1H6.1V9.1ZM11 7.7V7.2H10.5H10.3V4.55C10.3 4.24514 10.5451 4 10.85 4H12.95C13.2549 4 13.5 4.24514 13.5 4.55V7.2H13.3H12.8V7.7V10.7H11V7.7ZM1.2 4.2C1.2 3.70614 1.60614 3.3 2.1 3.3C2.60086 3.3 3 3.69914 3 4.2C3 4.69923 2.59549 5.1 2.1 5.1C1.60614 5.1 1.2 4.69386 1.2 4.2ZM6.49999 2.05168C6.64799 1.95278 6.822 1.9 7 1.9C7.50086 1.9 7.9 2.29914 7.9 2.8C7.9 2.978 7.84722 3.15201 7.74832 3.30001C7.64943 3.44802 7.50887 3.56337 7.34441 3.63149C7.17996 3.69961 6.999 3.71743 6.82442 3.68271C6.64984 3.64798 6.48947 3.56226 6.3636 3.4364C6.23774 3.31053 6.15202 3.15016 6.11729 2.97558C6.08257 2.801 6.10039 2.62004 6.16851 2.45558C6.23663 2.29113 6.35198 2.15057 6.49999 2.05168ZM11 1.4C11 0.906142 11.4061 0.5 11.9 0.5C12.4009 0.5 12.8 0.899143 12.8 1.4C12.8 1.89923 12.3955 2.3 11.9 2.3C11.4061 2.3 11 1.89386 11 1.4Z'
                stroke={stroke}
            />
        </svg>
    ),
    managementRuangan: ({ stroke, ...props }: LucideProps) => (
        <svg
            width='14'
            height='12'
            viewBox='0 0 14 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M4.2336 0.473948C4.11111 0.323773 3.96565 0.204621 3.80555 0.123299C3.64544 0.0419775 3.47381 7.97101e-05 3.30047 1.13625e-07C3.12713 -7.94828e-05 2.95548 0.0416607 2.79532 0.122835C2.63516 0.20401 2.48963 0.323029 2.36705 0.473091L2.12065 0.774796C1.8824 0.691589 1.63028 0.688301 1.39064 0.765276C1.151 0.842251 0.932657 0.996661 0.75845 1.21235C0.496751 1.53605 0.349953 1.97312 0.349953 2.4286C0.349953 2.88408 0.496751 3.32115 0.75845 3.64485L1.05 4.00441V8.57154H0V9.42866H0.7175C0.543682 9.63719 0.424526 9.90439 0.375227 10.1962C0.325927 10.488 0.34872 10.7911 0.440696 11.067C0.532673 11.3428 0.689667 11.5789 0.891656 11.7451C1.09365 11.9113 1.33148 12 1.57483 12C1.81817 12 2.056 11.9113 2.25799 11.7451C2.45998 11.5789 2.61698 11.3428 2.70895 11.067C2.80093 10.7911 2.82372 10.488 2.77442 10.1962C2.72512 9.90439 2.60597 9.63719 2.43215 9.42866H11.5678C11.394 9.63719 11.2749 9.90439 11.2256 10.1962C11.1763 10.488 11.1991 10.7911 11.291 11.067C11.383 11.3428 11.54 11.5789 11.742 11.7451C11.944 11.9113 12.1818 12 12.4252 12C12.6685 12 12.9064 11.9113 13.1083 11.7451C13.3103 11.5789 13.4673 11.3428 13.5593 11.067C13.6513 10.7911 13.6741 10.488 13.6248 10.1962C13.5755 9.90439 13.4563 9.63719 13.2825 9.42866H14V8.57154H12.6V7.23744C12.9006 7.14547 13.1674 6.93281 13.3577 6.63342C13.548 6.33403 13.6509 5.96518 13.65 5.58578C13.65 4.64724 13.0337 3.8857 12.2731 3.8857H4.9385C4.92431 3.88591 4.91024 3.88261 4.89712 3.87598C4.88401 3.86935 4.87213 3.85953 4.8622 3.84713L4.7341 3.68856L4.86325 3.53128C4.98587 3.38127 5.08316 3.20314 5.14954 3.00708C5.21593 2.81102 5.25011 2.60086 5.25015 2.38862C5.25018 2.17637 5.21606 1.9662 5.14973 1.77011C5.08341 1.57402 4.98618 1.39585 4.8636 1.24578L4.2336 0.473948ZM4.2406 3.08086L4.36835 2.92487C4.42592 2.85443 4.47159 2.77078 4.50275 2.67872C4.53391 2.58665 4.54994 2.48797 4.54994 2.38832C4.54994 2.28866 4.53391 2.18998 4.50275 2.09791C4.47159 2.00585 4.42592 1.92221 4.36835 1.85176L3.73835 1.08036C3.68086 1.00981 3.61259 0.953823 3.53743 0.915597C3.46226 0.877371 3.38168 0.857655 3.3003 0.857575C3.21891 0.857495 3.1383 0.877054 3.06309 0.915133C2.98788 0.953212 2.91953 1.00906 2.86195 1.0795L2.73945 1.2295L4.2406 3.08086ZM12.95 5.58578C12.95 5.11351 12.6413 4.74281 12.2731 4.74281H4.9385C4.83206 4.743 4.72665 4.71734 4.62836 4.66732C4.53008 4.6173 4.44087 4.54391 4.3659 4.45139L2.2288 1.81662C2.1652 1.7376 2.08941 1.67486 2.00583 1.63203C1.92225 1.58921 1.83255 1.56715 1.74195 1.56715C1.65135 1.56715 1.56165 1.58921 1.47807 1.63203C1.39449 1.67486 1.3187 1.7376 1.2551 1.81662C1.12367 1.97974 1.04998 2.19967 1.04998 2.42881C1.04998 2.65796 1.12367 2.87789 1.2551 3.04101L4.0033 6.42876H12.2731C12.642 6.42876 12.95 6.05805 12.95 5.58578ZM3.59625 7.14316C3.67045 7.23444 3.77055 7.28587 3.8752 7.28587H11.9V8.57154H1.75V4.86709L3.59625 7.14316ZM2.1 10.5001C2.1 10.6705 2.04469 10.8341 1.94623 10.9546C1.84777 11.0752 1.71424 11.1429 1.575 11.1429C1.43576 11.1429 1.30223 11.0752 1.20377 10.9546C1.10531 10.8341 1.05 10.6705 1.05 10.5001C1.05 10.3296 1.10531 10.1661 1.20377 10.0455C1.30223 9.92494 1.43576 9.85722 1.575 9.85722C1.71424 9.85722 1.84777 9.92494 1.94623 10.0455C2.04469 10.1661 2.1 10.3296 2.1 10.5001ZM12.425 11.1429C12.5642 11.1429 12.6978 11.0752 12.7962 10.9546C12.8947 10.8341 12.95 10.6705 12.95 10.5001C12.95 10.3296 12.8947 10.1661 12.7962 10.0455C12.6978 9.92494 12.5642 9.85722 12.425 9.85722C12.2858 9.85722 12.1522 9.92494 12.0538 10.0455C11.9553 10.1661 11.9 10.3296 11.9 10.5001C11.9 10.6705 11.9553 10.8341 12.0538 10.9546C12.1522 11.0752 12.2858 11.1429 12.425 11.1429Z'
                fill={stroke}
            />
        </svg>
    ),
    managementPeople: ({ stroke, ...props }: LucideProps) => (
        <svg
            width='14'
            height='12'
            viewBox='0 0 14 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <path
                d='M9.74899 7.62526C9.24575 7.62526 8.8168 7.44403 8.46214 7.08156C8.10749 6.71908 7.93016 6.27938 7.93016 5.76244C7.93016 5.2455 8.1064 4.80468 8.45889 4.43998C8.81138 4.07528 9.23897 3.89293 9.74167 3.89293C10.2444 3.89293 10.6731 4.07417 11.0277 4.43664C11.3824 4.79911 11.5597 5.23853 11.5597 5.75491C11.5597 6.2713 11.3835 6.71239 11.031 7.07821C10.6785 7.44403 10.2512 7.62638 9.74899 7.62526ZM5.49067 12V11.0548C5.49067 10.8724 5.53487 10.699 5.62326 10.5345C5.71166 10.37 5.83096 10.2376 5.98117 10.1372C6.55003 9.80371 7.14655 9.54831 7.77072 9.37097C8.39436 9.19364 9.0527 9.10498 9.74574 9.10498C10.4377 9.10498 11.0958 9.19364 11.7199 9.37097C12.3441 9.54831 12.9406 9.80371 13.5095 10.1372C13.6592 10.237 13.7785 10.3694 13.8674 10.5345C13.9563 10.6996 14.0005 10.873 14 11.0548V12H5.49067ZM6.33176 10.9067V11.1635H13.1589V10.9067C12.622 10.5956 12.0657 10.3569 11.4897 10.1907C10.9138 10.0245 10.3325 9.94145 9.74574 9.94145C9.15844 9.94145 8.57684 10.0245 8.00093 10.1907C7.42556 10.3569 6.86917 10.5956 6.33176 10.9067ZM9.74574 6.78879C10.0174 6.78879 10.2522 6.68702 10.4502 6.48348C10.6481 6.27994 10.7468 6.03848 10.7463 5.7591C10.7457 5.47972 10.647 5.23798 10.4502 5.03388C10.2533 4.82978 10.0185 4.72829 9.74574 4.7294C9.47297 4.73052 9.23789 4.83201 9.04049 5.03388C8.8431 5.23574 8.7444 5.47749 8.7444 5.7591C8.7444 6.04071 8.8431 6.28217 9.04049 6.48348C9.23789 6.68479 9.47297 6.78656 9.74574 6.78879ZM0 7.52823V6.69176H5.69403V7.52823H0ZM0 0.83647V0H8.94776V0.83647H0ZM6.35372 4.18235H0V3.34588H6.81982C6.72384 3.47581 6.63653 3.6077 6.5579 3.74153C6.47926 3.87537 6.41067 4.02231 6.35372 4.18235Z'
                fill={stroke}
            />
        </svg>
    )
};
