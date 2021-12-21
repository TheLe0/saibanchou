import { SuperUserVars } from '../src/config';
import { UserRepository } from '../src/repository';
import { Role } from '../src/model';

async function main() {

    const repository = new UserRepository();

    await repository.createNewUser(
        {
            name: SuperUserVars.Name,
            email: SuperUserVars.Email,
            role: Role.SYSADMIN
        },
        SuperUserVars.Password
    );
}

main();
