import {FileText, LayoutDashboard, type LucideIcon, Newspaper} from "lucide-react";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import * as React from "react";
import {ChevronDownIcon} from "@radix-ui/react-icons";
import {useState} from "react";
import {cn} from "@/lib/utils";

type LinkTypes = {
  icon: LucideIcon,
  label: string,
  subItem?: [
    {
      label: string
    }
  ]
  link?: string
}

const linksDef: LinkTypes[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    icon: FileText,
    label: "Forms",
    subItem: [
      {
        label: "Opsi Rapor Kesehatan"
      },
      {
        label: "Form Rapor Kesehatan"
      }
    ]
  },
  {
    icon: Newspaper,
    label: "Master Data",
    subItem: [
      {
        label: "Siswa Sakit"
      }
    ]
  }
]

const SidebarAdmin = () => {
  const [isActive, setIsActive] = useState<0>( 0)

  console.log(Array.isArray(isActive))
  return (
    <>
      <aside className="flex flex-col space-y-4 max-w-[18rem] w-full text-[#222831] shadow-md">
        <div className="text-center py-4">
          <h1 className="text-2xl font-semibold">UKS</h1>
        </div>
        <div className="px-4">
          <div className="flex flex-col gap-3">
            {linksDef.map((link, index) => (
              <>
                <Accordion type="single" collapsible>
                  <AccordionItem value={`navigation-${link.label}`} className="border-none">
                    <AccordionTrigger
                      onClick={() => setIsActive(index)}
                      className={cn("px-3 py-2 hover:no-underline rounded-md hover:bg-[#EEEEEE]", isActive === index && "bg-[#EEEEEE]" )}>
                      <div className="flex items-center gap-3">
                        <link.icon/>
                        {link.label}
                      </div>
                      {link.subItem && (
                        <ChevronDownIcon
                          className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"/>
                      )}
                    </AccordionTrigger>
                    {link.subItem && (
                      <AccordionContent className="pl-12 cursor-pointer font-medium">
                        {link.subItem.map((sub_item) => (
                            <div key={`sub-${sub_item.label}`} className="pt-4">
                              {sub_item.label}
                            </div>
                        ))}
                      </AccordionContent>
                    )}
                  </AccordionItem>
                </Accordion>
              </>
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}

export default SidebarAdmin;
