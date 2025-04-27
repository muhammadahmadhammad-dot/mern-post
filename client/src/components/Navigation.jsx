import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navigation = ({
  handleLogout = () => {},
  logo = {
    url: "/",
    src: "https://shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Posts",
  },
  auth = {
    login: { title: "Login", url: "/login" },
    logout: { title: "Logout", handleLogout },
    signup: { title: "Sign up", url: "/register" },
  },
}) => {
  return (
    <section className="py-4  flex justify-center">
      <div className="w-11/12">
        {/* Desktop Menu */}
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link to={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="max-h-8" alt={logo.alt} />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </Link>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="/"
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
                    >
                      <Link to="/">Home</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  {useSelector(
                    (state) =>
                      state.isAuth && (
                        <NavigationMenuItem to="/my-posts">
                          <NavigationMenuLink
                            href="/my-posts"
                            className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
                          >
                            <Link to="/my-posts">My Posts</Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      )
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2">
            {useSelector((state) =>
              state.isAuth ? (
                <Button onClick={handleLogout}>LOGOUT</Button>
              ) : (
                <>
                  <Button asChild variant="outline" size="sm">
                    <Link to={auth.login.url}>{auth.login.title}</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link to={auth.signup.url}>{auth.signup.title}</Link>
                  </Button>
                </>
              )
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="max-h-8" alt={logo.alt} />
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link to={logo.url} className="flex items-center gap-2">
                      <img src={logo.src} className="max-h-8" alt={logo.alt} />
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    <Link to="/" className="text-md font-semibold">
                      Home
                    </Link>
                    {useSelector(
                      (state) =>
                        state.isAuth && (
                          <Link
                            to="/my-posts"
                            className="text-md font-semibold"
                          >
                            My Posts
                          </Link>
                        )
                    )}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    {useSelector((state) =>
                      state.isAuth ? (
                        <Button onClick={handleLogout}>
                          {auth.logout.title}
                        </Button>
                      ) : (
                        <>
                          <Button asChild variant="outline">
                            <Link to={auth.login.url}>{auth.login.title}</Link>
                          </Button>
                          <Button asChild>
                            <Link to={auth.signup.url}>
                              {auth.signup.title}
                            </Link>
                          </Button>
                        </>
                      )
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navigation;
