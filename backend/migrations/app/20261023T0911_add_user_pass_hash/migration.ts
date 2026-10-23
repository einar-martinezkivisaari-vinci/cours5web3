#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/36d08ae6dc4502531c6692b363c04e9aaa9077a6d14e61539dc4892da2e38a31/contract';
import endContract from '../../snapshots/36d08ae6dc4502531c6692b363c04e9aaa9077a6d14e61539dc4892da2e38a31/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/95f37b9b12fec5762ac676ab11c49cdd4c278d51c361c943fdefb78b8a34c160/contract';
import startContract from '../../snapshots/95f37b9b12fec5762ac676ab11c49cdd4c278d51c361c943fdefb78b8a34c160/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col } from '@prisma/orm-postgres/migration';

import postgres from '@prisma/orm-postgres/runtime';

const { sql: db, contract } = postgres<End>({ contractJson: endContract });

// The bcrypt hash of "topsecret". Use any tool to get it, for example: https://bcrypt-generator.com
const DEMO_PASSWORD_HASH = '$2b$10$Uz3U4mBwsgUKte9bQKBNX.5LGJjYw1Z9Qvhxzy4gxdZrahpUU9/N2';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'user',
        column: col('passwordHash', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.dataTransform(contract, 'backfill-user-passwordHash', {
        // "which rows still need work?" — the runner asks this before, to see
        // if there is anything to do, and after, to confirm there is not.
        check: () =>
          db.public.user.select('id').where((f, fns) => fns.eq(f.passwordHash, null)).limit(1),
        run: () =>
          db.public.user
            .update({ passwordHash: DEMO_PASSWORD_HASH })
            .where((f, fns) => fns.eq(f.passwordHash, null)),
      }),
      this.setNotNull({ schema: 'public', table: 'user', column: 'passwordHash' }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
