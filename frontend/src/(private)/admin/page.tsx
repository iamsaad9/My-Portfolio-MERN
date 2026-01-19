import AboutForm from "@/components/Admin/AboutForm";
import { Tabs, Tab } from "@heroui/react";
import { User } from "lucide-react";

export default function App() {
  return (
    <div className="flex w-full flex-col mt-20 px-5 max-w-7xl mx-auto">
      <Tabs color="default" aria-label="Options" className="dark">
        <Tab
          key="about"
          title={
            <div className="flex items-center space-x-2">
              <User size={16} />
              <span>About</span>
            </div>
          }
        >
          <AboutForm />
        </Tab>
        <Tab
          key="skills"
          title={
            <div className="flex items-center space-x-2">
              <User size={16} />
              <span>Skills</span>
            </div>
          }
        >
          {/* <AboutForm /> */}
        </Tab>

        <Tab
          key="projects"
          title={
            <div className="flex items-center space-x-2">
              <User size={16} />
              <span>Projects</span>
            </div>
          }
        >
          {/* <AboutForm /> */}
        </Tab>
      </Tabs>
    </div>
  );
}
