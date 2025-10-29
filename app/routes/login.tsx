import { Form, useActionData, useNavigation } from "react-router";
import { useState, type FormEvent } from "react";
import { redirect } from "react-router";
import type { Route } from "./+types/login";

type ActionData = {
    errors?: {
        login?: string;
        password?: string;
        form?: string;
    };
};

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Login" },
        { name: "description", content: "Acesse sua conta" },
    ];
}

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const login = formData.get("login") as string;
    const password = formData.get("password") as string;

    const errors: ActionData["errors"] = {};

    if (!login.trim()) errors.login = "Informe o login.";
    if (!password.trim()) errors.password = "Informe a senha.";

    if (errors.login || errors.password) {
        return { errors } satisfies ActionData;
    }

    const isValid = login === "admin" && password === "admin";
    if (!isValid) {
        return { errors: { form: "Credenciais inválidas." } } satisfies ActionData;
    }

    return redirect("/");
}

export default function Login() {
    const actionData = useActionData<ActionData>();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    const [login, setLogin] = useState("admin");
    const [password, setPassword] = useState("admin");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        if (!login.trim() || !password.trim()) {
            event.preventDefault();
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-sm bg-white rounded-lg shadow p-6">
                <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Login</h1>

                {actionData?.errors?.form && (
                    <div className="mb-4 text-sm text-red-600">{actionData.errors.form}</div>
                )}

                <Form method="post" replace className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="login" className="block text-sm font-medium text-gray-700">
                            Usuário
                        </label>
                        <input
                            id="login"
                            name="login"
                            type="text"
                            autoComplete="username"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="seu.usuario"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            aria-invalid={actionData?.errors?.login ? true : undefined}
                            aria-describedby={actionData?.errors?.login ? "login-error" : undefined}
                        />
                        {actionData?.errors?.login && (
                            <p id="login-error" className="mt-1 text-sm text-red-600">
                                {actionData.errors.login}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Senha
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            aria-invalid={actionData?.errors?.password ? true : undefined}
                            aria-describedby={actionData?.errors?.password ? "password-error" : undefined}
                        />
                        {actionData?.errors?.password && (
                            <p id="password-error" className="mt-1 text-sm text-red-600">
                                {actionData.errors.password}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-md bg-purple-600 px-4 py-2 text-white font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-60"
                    >
                        {isSubmitting ? "Entrando..." : "Entrar"}
                    </button>
                </Form>
            </div>
        </div>
    );
}