import {FileText, LayoutDashboard, type LucideIcon, Newspaper} from "lucide-react";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import * as React from "react";
import {useState} from "react";
import {ChevronDownIcon} from "@radix-ui/react-icons";
import {cn} from "@/lib/utils";
import {useRouter} from "next/router";
import Link from "next/link";

type LinkTypes = {
  icon: LucideIcon,
  label: string,
  href?: string
  subItem?: Array<{
    label: string
    href: string
  }>
}

const linksDef: LinkTypes[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/admin-uks"
  },
  {
    icon: FileText,
    label: "Forms",
    subItem: [
      {
        label: "Opsi Rapor Kesehatan",
        href: "/admin-uks/forms/option-forms"
      },
      {
        label: "Form Rapor Kesehatan",
        href: "#"
      }
    ]
  },
  {
    icon: Newspaper,
    label: "Master Data",
    subItem: [
      {
        label: "Siswa Sakit",
        href: "#"
      },
      {
        label: "Siswa Sakit",
        href: "#"
      }
    ]
  }
]

const SidebarAdmin = () => {
  const [isActive, setIsActive] = useState<number>(0)
  const router = useRouter();
  console.log(router.pathname)

  return (
    <>
      <aside className="bg-[#FFFFFF] flex flex-col space-y-4 max-w-[18rem] w-full text-[#222831] border-r">
        <div className="text-center py-4">
          <h1 className="text-2xl font-semibold">UKS</h1>
        </div>
        <div className="px-4">
          <Accordion
            className="flex flex-col gap-3"
            type="single"
            collapsible
          >
            {linksDef.map((link, index) => (
              <>
                  <AccordionItem key={`navigation-${link.label}`} value={`navigation-${link.label}`} className="border-none">
                    <AccordionTrigger
                      asChild={!link.subItem}
                      onClick={() => setIsActive(index)}
                      className={cn(
                        "transition-all px-4 py-3 hover:no-underline rounded-lg hover:bg-[#EEEEEE]",
                        isActive === index && "bg-[#EEEEEE]"
                      )}>
                      {link?.href ? (
                        <Link href={link.href}>
                          <div className="flex items-center gap-3">
                            <link.icon size={20}/>
                            {link.label}
                          </div>
                        </Link>
                      ) : (
                        <>
                          <div className="flex items-center gap-3">
                            <link.icon size={20}/>
                            {link.label}
                          </div>
                          {link.subItem && (
                            <ChevronDownIcon
                              className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"/>
                          )}
                        </>
                      )}
                    </AccordionTrigger>
                    {link.subItem && (
                      <AccordionContent
                        className={cn("pl-12 cursor-pointer font-medium", !router.pathname)}
                      >
                        {link.subItem.map((sub_item, index) => (
                          <>
                            <div className="group relative">
                              <div
                                className="absolute bottom-0 w-0 transition-all group-hover:w-full h-[0.03rem] bg-black/70"></div>
                              {sub_item?.href ? (
                                <Link
                                  key={`sub-${sub_item.label}-${index}`} className="inline-block w-full py-4"
                                  href={sub_item.href}
                                >
                                  {sub_item.label}
                                </Link>
                              ) : (
                                <div className="inline-block w-full py-4">
                                  {sub_item.label}
                                </div>
                              )}
                            </div>
                          </>

                        ))}
                      </AccordionContent>
                    )}
                  </AccordionItem>
              </>
            ))}
          </Accordion>
        </div>
      </aside>
    </>
  )
}

export default SidebarAdmin;
