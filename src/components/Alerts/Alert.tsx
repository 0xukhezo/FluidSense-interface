import {
  CheckCircleIcon,
  XMarkIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";

interface AlertInterface {
  type: string;
  message: string;
}

export default function Alert({ type, message }: AlertInterface) {
  return (
    <div
      className={
        type === "success"
          ? "rounded-md bg-green-50 p-4"
          : type === "fail"
          ? "rounded-md bg-red-50 p-4"
          : "rounded-md bg-blue-50 p-4"
      }
    >
      <div className="flex">
        <div className="flex-shrink-0">
          {type === "success" ? (
            <CheckCircleIcon
              className="h-5 w-5 text-green-400"
              aria-hidden="true"
            />
          ) : type === "fail" ? (
            <XMarkIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          ) : (
            <InformationCircleIcon
              className="h-5 w-5 text-blue-400"
              aria-hidden="true"
            />
          )}
        </div>
        <div className="ml-3">
          <p
            className={
              type === "success"
                ? "text-sm font-medium text-green-800"
                : type === "fail"
                ? "text-sm font-medium text-red-800"
                : "text-sm font-medium text-blue-800"
            }
          >
            {message}
          </p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className={
                type === "success"
                  ? "inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                  : type === "fail"
                  ? "inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                  : "inline-flex rounded-md bg-blue-50 p-1.5 text-blue-500 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-blue-50"
              }
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
