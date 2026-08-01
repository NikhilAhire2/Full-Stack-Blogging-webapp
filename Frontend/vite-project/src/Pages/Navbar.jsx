import React, { useState } from 'react'
import Logo from "../assets/Logo.png"
import { Input } from "../components/ui/input.jsx";
import { Button } from '../components/ui/button.jsx';
import { Link } from 'react-router-dom';
import { Search } from "lucide-react"
import { FaMoon, FaSun } from "react-icons/fa"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar.jsx"
import { useSelector } from 'react-redux';
import store from '../redux/store.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleTheme } from '../redux/themeSlice.js';
import { HiMenuAlt3 } from "react-icons/hi"
import { toast } from 'sonner';
import axios from 'axios';
import ResponsiveMenu from "../components/ui/ResponsiveMenu.jsx"
import { setUser } from '../redux/authSlice.js';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    User,
    PenLine,
    CreditCard,
    Settings,
    Keyboard,
    Users,
    Mail,
    MessageSquare,
    Plus,
    Github,
    LifeBuoy,
    LogOut,
} from "lucide-react"





const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [openNav, setOpenNav] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { theme } = useSelector(store => store.theme)

    const handleLogout = async (e) => {
        try {
            const res = await axios.get("https://full-stack-blogging-webapp.onrender.com/api/v1/user/logout", { withCredentials: true })
            if (res.data.success) {
                navigate("/")
                dispatch(setUser(null))
                toast.success(res.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error);


        }

    }
    const toggleNav = (e) => {
        setOpenNav(!openNav)
    }
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== '') {
            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
            setSearchTerm("")
        }
    };

    const { user } = useSelector(store => store.auth)
    

    return (
        <div className='py-2 fixed top-0 left-0 w-full z-50 dark:bg-gray-800 dark:border-b-gray-600 border-2 bg-white'>


            <div className='max-w-7xl mx-auto flex justify-between items-center px-4 md:px-0'>
                <div className='flex gap-7 items-center'>
                    {/*logo section */}
                    <Link to={"/"}>
                        <div className='flex gap-2 items-center'>
                            <img src={Logo} alt="" className='w-10 h-10 md:w-15 md:h-15 dark:invert' />
                            <h1 className='font-bold text-2xl md:text-4xl text-black dark:text-white'>SkyBlogs</h1>

                        </div>
                    </Link>
                    <div className='relative hidden md:block'>
                        <Input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                            className="border border-gray-700 dark:text-white dark:bg-gray-900 bg-gray-300 w-[300px] hidden md:block"
                        />
                        <Button onClick={handleSearch} className="absolute right-0 top-0"><Search /></Button>
                    </div>
                </div>
                {/* nav section */}
                <nav className='flex md:gap-7 gap-4 items-center'>
                    <ul className='hidden md:flex gap-7 items-center text-xl font-semibold text-black dark:text-white'>

                        <Link to={"/"}><li>Home</li></Link>
                        <Link to={"/blogs"}><li>Blogs</li></Link>
                        <Link to={"/about"}><li>About</li></Link>
                    </ul>
                    <div className='flex' >
                        <Button className="cursor-pointer" onClick={() => dispatch(toggleTheme())}>

                            {
                                theme === 'light' ? <FaMoon /> : <FaSun />
                            }
                        </Button>
                        {
                            user ? ((
                                <div className="ml-7 flex items-center gap-3">

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Avatar>
                                                <AvatarImage src={user.photoUrl} />
                                                <AvatarFallback >NA</AvatarFallback>
                                            </Avatar>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent className="w-56" align="start">
                                            <DropdownMenuLabel>My Account</DropdownMenuLabel>

                                            <DropdownMenuGroup>
                                                <DropdownMenuItem className="flex items-center gap-2" onClick={() => navigate("/dashboard/profile")}>
                                                    <User className="h-4 w-4" />
                                                    Profile
                                                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                                </DropdownMenuItem>

                                                <DropdownMenuItem className="flex items-center gap-2" onClick={() => navigate("/dashboard/your-Blogs")}>
                                                    <CreditCard className="h-4 w-4" />
                                                    Your Blog
                                                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                                </DropdownMenuItem>

                                                <DropdownMenuItem className="flex items-center gap-2" onClick={() => navigate("/dashboard/write")}>
                                                    <PenLine className="h-4 w-4" />
                                                    Write Blog
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="flex items-center gap-2" onClick={() => navigate("/dashboard/comments")}>
                                                    <MessageSquare className="h-4 w-4" />
                                                    Comments
                                                </DropdownMenuItem>

                                            </DropdownMenuGroup>

                                            <DropdownMenuSeparator />

                                            <DropdownMenuGroup>
                                                <DropdownMenuItem className="flex items-center gap-2">
                                                    <Users className="h-4 w-4" />
                                                    Team
                                                </DropdownMenuItem>

                                                <DropdownMenuSub>
                                                    <DropdownMenuSubTrigger className="flex items-center gap-2">
                                                        <Plus className="h-4 w-4" />
                                                        Invite users
                                                    </DropdownMenuSubTrigger>

                                                    <DropdownMenuPortal>
                                                        <DropdownMenuSubContent>
                                                            <DropdownMenuItem className="flex items-center gap-2">
                                                                <Mail className="h-4 w-4" />

                                                                <Link
                                                                    to="https://mail.google.com/mail/?view=cm&fs=1&to=recipient@example.com&su=Your%20Subject&body=Your%20Message"
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    Email
                                                                </Link>
                                                            </DropdownMenuItem>

                                                            <DropdownMenuSeparator />

                                                            <DropdownMenuItem className="flex items-center gap-2">
                                                                <Plus className="h-4 w-4" />
                                                                More...
                                                            </DropdownMenuItem>
                                                        </DropdownMenuSubContent>
                                                    </DropdownMenuPortal>
                                                </DropdownMenuSub>

                                                {/* <DropdownMenuItem className="flex items-center gap-2">
                                                    <Users className="h-4 w-4" />
                                                    New Team
                                                    <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                                                </DropdownMenuItem> */}
                                            </DropdownMenuGroup>

                                            <DropdownMenuSeparator />

                                            <DropdownMenuItem className="flex items-center gap-2">
                                                <Github className="h-4 w-4" />
                                                <Link to={user.github}> GitHub</Link>
                                            </DropdownMenuItem>

                                            <DropdownMenuItem className="flex items-center gap-2">
                                                <LifeBuoy className="h-4 w-4" />
                                                Support
                                            </DropdownMenuItem>

                                            <DropdownMenuItem disabled className="flex items-center gap-2">

                                            </DropdownMenuItem>

                                            <DropdownMenuSeparator />

                                            <DropdownMenuItem className="flex items-center gap-2 text-red-600 focus:text-red-600">
                                                <LogOut className="h-4 w-4" />
                                                <span
                                                    onClick={handleLogout}
                                                    className="cursor-pointer text-sm font-medium text-red-500 hover:text-red-600"
                                                >
                                                    Logout
                                                </span>

                                                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                    <Button className="hidden md:block cursor-pointer" onClick={handleLogout}>
                                        Logout
                                    </Button>

                                </div>
                            )) : <div className='ml-7 md:flex gap-3'>
                                <Link to={"/login"}><Button className="cursor-pointer">Login</Button></Link>
                                <Link to={"/signup"}><Button className="cursor-pointer">SignUp</Button></Link>
                            </div>
                        }
                    </div>
                    {
                        openNav ? <HiMenuAlt3 onClick={toggleNav} className="w-7 h-7 md:hidden" /> : <HiMenuAlt3 className="w-7 h-7 md:hidden" onClick={toggleNav} />

                    }

                </nav>
                <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} logoutHandler={handleLogout} />

            </div>
        </div>
    )
}

export default Navbar 
