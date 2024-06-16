import { Badge, DarkThemeToggle, Sidebar } from 'flowbite-react';
import { useRef, useState } from 'react';
import { HiPhotograph,HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiCloudUpload, HiOutlineMinusSm, HiOutlinePlusSm } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const SideBar = () => {
    return (
        <div id="sidePanel" className='flex h-full'>
            <SideBarComponent />
        </div>
    )
}


const usClickOutside = () => {

}



const SideBarComponent = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const sideRef = useRef();

    const sidebarTheme = {
        "root": {
            "base": "h-full",
            "collapsed": {
                "on": "w-16",
                "off": "w-64"
            },
            "inner": "h-full overflow-y-hidden overflow-x-hidden rounded bg-white py-4 px-3 dark:bg-gray-800"
        },
        "collapse": {
            "button": "group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
            "icon": {
                "base": "h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
                "open": {
                    "off": "",
                    "on": "text-gray-900"
                }
            },
            "label": {
                "base": "ml-3 flex-1 whitespace-nowrap text-left",
                "icon": {
                    "base": "h-6 w-6 transition ease-in-out delay-0",
                    "open": {
                        "on": "rotate-180",
                        "off": ""
                    }
                }
            },
            "list": "space-y-2 py-2"
        },
        "cta": {
            "base": "mt-6 rounded-lg p-4 bg-gray-100 dark:bg-gray-700",
            "color": {
                "blue": "bg-cyan-50 dark:bg-cyan-900",
                "dark": "bg-dark-50 dark:bg-dark-900",
                "failure": "bg-red-50 dark:bg-red-900",
                "gray": "bg-alternative-50 dark:bg-alternative-900",
                "green": "bg-green-50 dark:bg-green-900",
                "light": "bg-light-50 dark:bg-light-900",
                "red": "bg-red-50 dark:bg-red-900",
                "purple": "bg-purple-50 dark:bg-purple-900",
                "success": "bg-green-50 dark:bg-green-900",
                "yellow": "bg-yellow-50 dark:bg-yellow-900",
                "warning": "bg-yellow-50 dark:bg-yellow-900"
            }
        },
        "item": {
            "base": "flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
            "active": "bg-gray-100 dark:bg-gray-700",
            "collapsed": {
                "insideCollapse": "group w-full pl-8 transition duration-75",
                "noIcon": "font-bold"
            },
            "content": {
                "base": "px-3 flex-1 whitespace-nowrap"
            },
            "icon": {
                "base": "h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
                "active": "text-gray-700 dark:text-gray-100"
            },
            "label": "",
            "listItem": ""
        },
        "items": {
            "base": ""
        },
        "itemGroup": {
            "base": "mt-4  space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700"
        },
        "logo": {
            "base": "mb-5 flex items-center pl-2.5 pt-5 pb-5",
            "collapsed": {
                "on": "hidden",
                "off": "self-center whitespace-nowrap text-xl font-semibold dark:text-white"
            },
            "img": "mr-3 h-6 sm:h-7"
        }
    }



    return (
        <Sidebar aria-label="Sidebar with logo branding example" theme={sidebarTheme} collapseBehavior='collapse' onMouseLeave={() => (setIsCollapsed(false))} onMouseEnter={() => (setIsCollapsed(false))} collapsed={isCollapsed} >
            <Sidebar.Logo href="/" img="https://flowbite.com/docs/images/logo.svg" imgAlt="Flowbite logo">
                Flowbite
            </Sidebar.Logo>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item href="#" >
                        <DarkThemeToggle></DarkThemeToggle>
                    </Sidebar.Item>
                    <Link to='/Utility'>
                        <Sidebar.Item href="#" icon={HiChartPie}>
                            Dashboard
                        </Sidebar.Item>
                    </Link>
                    <Link to={'/Gallery'}>
                        <Sidebar.Item href="#" icon={HiPhotograph}>
                        Gallery
                        </Sidebar.Item>
                    </Link>
                    <Link to={'/FileUpload'}>
                        <Sidebar.Item href="#" icon={HiCloudUpload}>
                            Upload Files
                        </Sidebar.Item>
                    </Link>
                    <Sidebar.Collapse
                        icon={HiInbox}
                        label="Inbox"
                        renderChevronIcon={(theme, open) => {
                            const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

                            return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />;
                        }}
                    >
                        <Sidebar.Item href="#">Products</Sidebar.Item>
                        <Sidebar.Item href="#">Sales</Sidebar.Item>
                        <Sidebar.Item href="#">Refunds</Sidebar.Item>
                        <Sidebar.Item href="#">Shipping</Sidebar.Item>
                    </Sidebar.Collapse>                   
                    <Sidebar.Item href="#" icon={HiUser}>
                        Users
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiShoppingBag}>
                        Products
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiArrowSmRight}>
                        Sign In
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiTable}>
                        Sign Up
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup>
                    <Sidebar.CTA>
                        <div className="mb-3 flex items-center">
                            <Badge color="warning">Beta</Badge>
                            <button
                                aria-label="Close"
                                className="-m-1.5 ml-auto inline-flex h-6 w-6 rounded-lg bg-gray-100 p-1 text-cyan-900 hover:bg-gray-200 focus:ring-2 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
                                type="button"
                            >
                                <svg
                                    aria-hidden
                                    className="h-4 w-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="mb-3 text-sm text-cyan-900 dark:text-gray-400">
                            Preview the new Flowbite dashboard navigation! You can turn the new navigation off for a limited time in your
                            profile.
                        </div>
                        <a
                            className="text-sm text-cyan-900 underline hover:text-cyan-800 dark:text-gray-400 dark:hover:text-gray-300"
                            href="#"
                        >
                            Turn new navigation off
                        </a>
                    </Sidebar.CTA>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}

export default SideBar