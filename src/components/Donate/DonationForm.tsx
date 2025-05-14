"use client";

import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface DonationFormValues {
  name?: string;
  email: string;
  message?: string;
  anonymous: boolean;
}

interface Props {
  onSubmit: (data: DonationFormValues) => void;
  onBack: () => void;
}

const DonationForm: React.FC<Props> = ({ onSubmit, onBack }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DonationFormValues>({
    defaultValues: {
      anonymous: false,
    },
  });

  const anonymous = watch("anonymous");

  return (
    <section className="py-20 bg-lightBg text-darkText">
      <div className="max-w-xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-primary mb-8 text-center">
          Your <span className="text-gold">Details</span>
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Anonymous Toggle */}
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              {...register("anonymous")}
              className="w-4 h-4 border rounded text-primary focus:ring-primary"
            />
            <span className="text-primary font-medium">I prefer to stay anonymous</span>
          </label>

          {/* Name (if not anonymous) */}
          {!anonymous && (
            <div>
              <label htmlFor="name" className="block font-semibold text-primary mb-1">
                Full Name
              </label>
              <input
                id="name"
                {...register("name", { required: true })}
                placeholder="e.g. Aisha Sarr"
                className="w-full px-4 py-2 border rounded-md"
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">Name is required.</p>
              )}
            </div>
          )}

          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-semibold text-primary mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: true })}
              placeholder="e.g. you@example.com"
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">Valid email is required.</p>
            )}
          </div>

          {/* Optional Message */}
          <div>
            <label htmlFor="message" className="block font-semibold text-primary mb-1">
              Message <span className="text-gold text-sm font-normal">(optional)</span>
            </label>
            <textarea
              id="message"
              {...register("message")}
              rows={3}
              placeholder="e.g., For my late father"
              className="w-full px-4 py-2 border rounded-md"
            />
            <p className="text-sm text-gray-500 mt-1">Can be used for dedications or notes.</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between mt-8 gap-4">
            <button
              type="button"
              onClick={onBack}
              className="w-full sm:w-auto border-2 border-primary text-primary px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Return
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto bg-gold text-black px-6 py-3 font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-500 transition"
            >
              Continue
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default DonationForm;