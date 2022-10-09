import React from 'react'
import Image from 'next/image'
import LoginForm from 'components/forms/LoginForm'
import { NextSeo } from 'next-seo'


const Login = () => {
    return (
        <>
            <NextSeo 
                title="Connexion"
                description="Page de connexion"
            />
            <div className="h-full w-full flex flex-row justify-start items-start bg-l-default dark:bg-d-default">
                <div className="w-full max-w-lg flex flex-col justify-start items-start">
                    <div className="pt-8 px-[10%] w-full flex flex-row justify-start items-center relative">
                        <div
                            className="bg-l-primary-main dark:bg-d-primary-main rounded-[4px] p-2 w-12 h-12"
                        >
                            <Image
                                src="/logo_white.svg"
                                width={46}
                                height={46}
                                alt="Blog Logo"
                            />
                        </div>
                        <div className="pt-0 pl-4 flex flex-col justify-center items-start h-16 flex-grow">
                            <p className="text-xl text-l-100 dark:text-d-100 w-full truncate">
                                Blogiz
                            </p>
                            <p className="text-md text-l-400 dark:text-d-400 w-full truncate">
                                Interface Administrateur
                            </p>
                        </div>
                    </div>
                    <div className="h-[calc(100vh-96px)] w-full px-[10%] flex flex-col justify-center items-start">
                        <p className="text-l-100 dark:text-d-100 text-2xl mb-1 font-bold">Connexion</p>
                        <LoginForm admin={true} />
                    </div>
                </div>
                <div className="max-w-[calc(100%-500px)] w-full h-screen flex">
                    <svg width='100%' viewBox='0 0 1152 1152' preserveAspectRatio='none' fill='none' data-v-3a37fa47=''>
                        <rect width='1152' height='1152' fill='#6644FF' data-v-3a37fa47=''></rect>
                        <path
                            d='M1152 409.138C1148.61 406.92 1146.7 405.765 1146.7 405.765L6.87761e-07 958.424L-7.3277e-07 1152L506.681 1152C558.985 1126.93 614.88 1101.25 672.113 1074.95C839.401 998.085 1018.12 915.967 1152 828.591L1152 409.138Z'
                            fill='#754DFC'
                            data-v-3a37fa47=''
                        ></path>
                        <path
                            d='M1152 159.866C1130.19 146.319 1114.45 138.98 1114.45 138.98L-6.09246e-07 759.421L-3.66364e-07 1152L88.7501 1152C131.867 1108.8 194.289 1054.33 281.936 993.927C371.847 931.97 507.23 864.306 651.138 792.382C828.097 703.939 1017.95 609.052 1152 510.407L1152 159.866Z'
                            fill='#8555F8'
                            data-v-3a37fa47=''
                        ></path>
                        <path
                            d='M772.894 -0.000472457L-4.49523e-07 457.782L-5.22658e-07 953.071C22.142 919.082 94.6279 821.1 262.854 696.786C351.427 631.334 485.624 558.338 628.272 480.744C816.642 378.28 1019.75 267.8 1152 156.087L1152 -0.000477328L772.894 -0.000472457Z'
                            fill='#945EF5'
                            data-v-3a37fa47=''
                        ></path>
                        <path
                            d='M286.365 -0.000483108L-1.73191e-07 176.373L2.43255e-06 662.21C33.488 615.87 106.028 529.959 243.326 424.909C331.205 357.671 464.771 281.956 606.749 201.473C720.914 136.756 840.519 68.9554 946.182 -0.000479285L286.365 -0.000483108Z'
                            fill='#A366F1'
                            data-v-3a37fa47=''
                        ></path>
                        <path
                            d='M0.00195277 363.139C37.1564 313.499 107.096 233.66 228.181 137.623C281.94 94.9838 353.09 48.7594 432.872 9.43526e-06L0.00195595 0L0.00195277 363.139Z'
                            fill='#B36FEE'
                            data-v-3a37fa47=''
                        ></path>
                    </svg>
                </div>
            </div>
        </>
    )
}


export default Login

