export type Queries = {
  q: string;
};

export const questions: Queries[] = [
  {
    q: "What are smart contracts?",
  },
  { q: "Create a Defi and Lending platform using the sui move language" },
  { q: "What does the assert method do in the sui move language" },
  { q: "How do i define a function using the sui move language" },
  // { q: "Create a Defi and Lending platform using the sui move language" },
];
export const contracts: Queries[] = [
  {
    q: "Create me a jackpot smart contract",
  },
  { q: "Create a smart contract for an nft marketplace?" },
  { q: "Example of a smart contract for a Jackpot game" },
  { q: "How do i define a function using the sui move language" },
  // { q: "Create a Defi and Lending platform using the sui move language" },
];


export const demo_data = "To write a smart contract in the Move language, you can follow these general steps:\n\n1. **Define the Smart Contract Structure**: Start by defining the structure of your smart contract. This includes specifying the modules, resources, and functions that your contract will contain.\n\n2. **Declare Modules and Resources**: Modules are used to group related functions and resources together. Resources represent the data that will be stored on the blockchain.\n\n3. **Implement Functions**: Define the functions that will be part of your smart contract. These functions can interact with resources, perform operations, and handle transactions.\n\n4. **Handle Transactions**: Use the Move language to handle transactions within your smart contract. This includes defining entry functions that can be called externally to interact with the contract.\n\n5. **Compile and Deploy**: Once you have written your smart contract in Move, you can compile it using the Move compiler. After compiling, you can deploy the contract to the Sui network using the Sui CLI.\n\nHere is a basic example of a smart contract in Move:\n\n```rust\nmodule MyContract {\n    resource struct MyResource {\n        value: u64,\n    }\n\n    public fun initialize(): R#Self.MyResource {\n        R#Self.MyResource { value: 0 }\n    }\n\n    public fun updateValue(account: &signer, new_value: u64) {\n        let resource_ref = borrow_global_mut<R#Self.MyResource>(account);\n        resource_ref.value = new_value;\n    }\n}\n```\n\nIn this example:\n- We define a module `MyContract`.\n- We declare a resource `MyResource` with a single field `value`.\n- We have an `initialize` function to initialize the resource.\n- We have an `updateValue` function that updates the value of the resource.\n\nRemember to adapt the contract to your specific use case and requirements. Additionally, refer to the Move language documentation and the specific requirements of your project for more detailed guidance on writing smart contracts in Move."