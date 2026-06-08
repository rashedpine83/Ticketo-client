"use client";
import DashboardHeading from "@/components/DashboardHeading";
import { addOrganization, updateOrg } from "@/lib/api/organizations/action";
import { myOrganization } from "@/lib/api/organizations/data";
import { useSession } from "@/lib/auth-client";
import { uploadImage } from "@/utils/uploadImage";
import {
  Button,
  Card,
  CardHeader,
  Form,
  Input,
  Label,
  TextArea,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaImage } from "react-icons/fa";

const Organization = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data: session } = useSession();
  const [myOrg, setMyOrg] = useState(null);

  useEffect(() => {
    if (!session?.user?.email) return;

    const setOrgData = async () => {
      const org = await myOrganization(session.user.email);
      setMyOrg(org);
    };

    setOrgData();
  }, [session]);
  console.log(myOrg);

  const onSubmit = async (data) => {
    // Upload image to imgbb

    const imageFile = data.logo[0];
    const imageUrl = await uploadImage(imageFile);

    const orgData = {
      organizationName: data.organizationName,
      logo: imageUrl,
      website: data.website,
      description: data.description,
      organizerEmail: session.user.email,
    };
    if (!myOrg) {
      const resData = await addOrganization(orgData);
      if (resData.insertedId) {
        toast.success("Organization added successfully");
      }
    } else {
      const updatedRes = await updateOrg(orgData, myOrg._id);
      if (updatedRes.modifiedCount > 0) {
        toast.success("Organization profile updated successfully");
      }
    }
  };

  return (
    <div>
      <DashboardHeading
        title="Organization Profile"
        description="Manage your organization information"
      />

      <div className="mt-6 max-w-3xl">
        <Card
          className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl rounded-2xl"
          radius="lg"
        >
          <CardHeader className="flex flex-col items-start gap-1 pb-4 border-b border-white/5 p-6">
            <h3 className="text-xl font-bold text-white">
              Organization Details
            </h3>
            <p className="text-slate-400 text-sm">
              Review and edit your organization credentials.
            </p>
          </CardHeader>

          <div className="p-6">
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5 w-full"
            >
              {/* Organization Name */}
              <div className="w-full space-y-2">
                <label
                  htmlFor="organizationName"
                  className="text-sm font-medium text-slate-300"
                >
                  Organization Name
                </label>

                <Input
                  defaultValue={myOrg?.organizationName}
                  {...register("organizationName", {
                    required: "Name is required",
                  })}
                  id="organizationName"
                  placeholder="TechEvents Corp"
                  className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                  required
                />
                {errors.organizationName && (
                  <span className="text-sm text-red-500">
                    {errors.organizationName.message}
                  </span>
                )}
              </div>

              {/* Organization Logo */}

              <div>
                <Label htmlFor="image"> Organization Logo URL</Label>
                <Input
                  {...register("logo", { required: "Logo is required" })}
                  type="file"
                  accept="image/*"
                  id="logo"
                  placeholder="https://example.com/avatar.jpg"
                  startadornment={
                    <FaImage className="text-slate-400 text-sm" />
                  }
                  className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                />
                {errors.logo && (
                  <span className="text-sm text-red-500">
                    {errors.logo.message}
                  </span>
                )}
              </div>

              {/* Website */}
              <div className="w-full space-y-2">
                <label
                  htmlFor="organizationWebsite"
                  className="text-sm font-medium text-slate-300"
                >
                  Organization Website
                </label>

                <Input
                  defaultValue={myOrg?.website}
                  {...register("website", {
                    required: "Website is required",
                  })}
                  id="website"
                  placeholder="https://techevents.com"
                  className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                  required
                />
                {errors.website && (
                  <span className="text-sm text-red-500">
                    {errors.website.message}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="w-full space-y-2">
                <label
                  htmlFor="organizationDescription"
                  className="text-sm font-medium text-slate-300"
                >
                  Description
                </label>

                <TextArea
                  defaultValue={myOrg?.description}
                  {...register("description", {
                    required: "Description is required",
                  })}
                  id="description"
                  placeholder="Hosting global developer conferences and software hacking marathons."
                  rows={8}
                  className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                  required
                />
                {errors.description && (
                  <span className="text-sm text-red-500">
                    {errors.description.message}
                  </span>
                )}
              </div>

              <div className="flex gap-4 pt-2">
                <Button
                  type="submit"
                  radius="lg"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-11 px-6"
                >
                  Save Changes
                </Button>
              </div>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Organization;
