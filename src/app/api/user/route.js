export async function POST(req){
    try {
        await connectToDB();
        const {name, email} = await req.json();

        const newUser = await User.create({name, email});

        if(newUser){
            return new Response(JSON.stringify(newUser), {status: 201});
        }else{
            return new Response("Failed to create user", {status: 500});
        }
    } catch (error) {
        console.error("Error creating user:", error);
        return new Response("Internal Server Error", {status: 500});
    }
}