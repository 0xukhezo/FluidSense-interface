import CampaignForm from "@/components/CampaignForm";
import { Profile } from "@/components/Profile";

export default function Home() {
  return (
    <>
      <div className="flex justify-end mt-8 mr-20">
        <Profile />
      </div>
      <div className="flex justify-center mt-10 flex-col">
        <h1 className="text-3xl mx-auto my-6">Fluid Sense</h1>
        <CampaignForm />
      </div>
    </>
  );
}
