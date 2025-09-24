import { ButtonText } from "@/components/common/ButtonText";
import { MainMenu } from "@/components/common/MainMenu";
import { PageFooter } from "@/components/common/PageFooter";
import { PageHeader } from "@/components/common/PageHeader";

export function Home() {

  return (
    <div
      className="page-container h-100"
    >
      <PageHeader
        right={
          <MainMenu />
        }
      />

      <section
        className="flex flex-column align-center gap-2 text-large"
      >
        <span>
          Cosa vuoi ordinare?
        </span>

        <div
          className="flex flex-column align-center gap-2"
        >
          <ButtonText
            text={"Poke"}
            classes="border-r-10 w-100 text-center border-1-solid border-primary large main-bg primary-color"
            linkTo="/poke-configurator"
          />
          <ButtonText
            text={"Menu"}
            classes="border-r-10 w-100 text-center border-1-solid border-primary large main-bg primary-color"
            linkTo="/menu"
          />
        </div>

      </section>


      <PageFooter
      />
    </div>
  )
}

