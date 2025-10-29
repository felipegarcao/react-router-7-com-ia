import { redirect, useFetcher } from "react-router";
import type { Route } from "./+types/login";
import { parseWithZod } from "@conform-to/zod";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import z from "zod";

const schema = z.object({
    email: z.string().email("Informe um e-mail válido."),
    password: z.coerce.string().min(6, "Necessario ter no minimo 6 caracteres")
})


export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Login" },
        { name: "description", content: "Acesse sua conta" },
    ];
}

export async function action({ request }: Route.ActionArgs) {

    const formData = await request.formData();

    const submission = parseWithZod(formData, { schema });

    if (submission.status !== "success") {
        return submission.reply();
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));

    return redirect("/loaders");
}

export default function Login({ actionData }: Route.ComponentProps) {

    const fetcher = useFetcher();
    const busy = fetcher.state !== "idle";

    const [form, fields] = useForm({
        lastResult: actionData,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema })
        }
    });



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-sm bg-white rounded-lg shadow p-6">
                <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Login</h1>
                <fetcher.Form {...getFormProps(form)} method="post" className="space-y-4">
                    <div>
                        <label htmlFor="login" className="block text-sm font-medium text-gray-700">
                            Usuário
                        </label>
                        <input
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            {...getInputProps(fields.email, { type: "email" })}
                        />
                        {fields.email.errors && (
                            <div className="mt-1 text-sm text-red-600">
                                {fields.email.errors}
                            </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Senha
                        </label>
                        <input
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            {...getInputProps(fields.password, { type: "password" })}
                        />
                        {fields.password.errors && (
                            <div className="mt-1 text-sm text-red-600">
                                {fields.password.errors}
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={busy}
                        className="w-full rounded-md bg-purple-600 px-4 py-2 text-white font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-60"
                    >
                        Entrar
                    </button>
                </fetcher.Form>
            </div>
        </div>
    );
}