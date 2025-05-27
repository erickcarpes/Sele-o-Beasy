import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Brain, Info } from "lucide-react";

export function DesktopSidebar() {

  const items = [
    {
      title: "Chatbot",
      url: "/chatbot",
      icon: Brain,
    },
    {
      title: "Sobre nós",
      url: "/about",
      icon: Info,
    },
  ];

  return (
    <Sidebar className="bg-[#1b1c21]">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Taurus</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
