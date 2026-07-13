import type { DocSection } from "@/constants/docsNavigation";
import InstallationSection from "@/components/sections/InstallationSection";
import FirstTestSection from "@/components/sections/FirstTestSection";
import TheRegistrySection from "@/components/sections/TheRegistrySection";
import RuntimeFixturesSection from "@/components/sections/RuntimeFixturesSection";
import ExtendFixturesSection from "@/components/sections/ExtendFixturesSection";
import CliReferenceSection from "@/components/sections/CliReferenceSection";
import TypesReferenceSection from "@/components/sections/TypesReferenceSection";
import InternalLocatorsSection from "@/components/sections/InternalLocatorsSection";
import DynamicLocatorsSection from "@/components/sections/DynamicLocatorsSection";
import ChainLocatorsSection from "@/components/sections/ChainLocatorsSection";
import AutoStepsSection from "@/components/sections/AutoStepsSection";
import SecretMaskingSection from "@/components/sections/SecretMaskingSection";
import TableSection from "@/components/sections/TableSection";
import TemplateC from "@/components/sections/TemplateC";
import CodegenSection from "@/components/sections/CodegenSection";
import ReleasesSection from "@/components/sections/ReleasesSection";

export interface DocSectionRendererProps {
  section: DocSection;
}

export function DocSectionRenderer({ section }: DocSectionRendererProps) {
  switch (section.id) {
    case "installation":
      return <InstallationSection />;
    case "your-first-test":
      return <FirstTestSection />;
    case "page-registry":
      return <TheRegistrySection />;
    case "test-runtime":
      return <RuntimeFixturesSection />;
    case "extend-fixtures":
      return <ExtendFixturesSection />;
    case "pw-core-codegen":
      return <CodegenSection />;
    case "internal-locators":
      return <InternalLocatorsSection />;
    case "dynamic-locators":
      return <DynamicLocatorsSection />;
    case "chain-locators":
      return <ChainLocatorsSection />;
    case "auto-steps":
      return <AutoStepsSection />;
    case "secret-masking":
      return <SecretMaskingSection />;
    case "features-table":
      return <TableSection />;
    case "cli":
      return <CliReferenceSection />;
    case "releases":
      return <ReleasesSection />;
    case "types-reference":
      return <TypesReferenceSection />;
    default:
      return (
        <TemplateC
          id={section.id}
          label={section.label}
          title={section.title}
          description={section.description}
          problem={section.problem}
          solution={section.solutionText}
          code={section.code}
          codeFilename={section.codeFilename}
          results={section.results}
          pills={[...(section.whyItMatters || []), ...(section.useThisIf || [])]}
        />
      );
  }
}
