import { world } from '@minecraft/server';

world.afterEvents.itemUse.subscribe((data) => {
    const item = data.itemStack
    const player = data.source
    if (item.typeId === "minecraft:iron_sword") {
        player.runCommandAsync(`effect @s strength 5 1 false`)
    }
}
);

world.afterEvents.entityHurt.subscribe(({ damage, damageSource, hurtEntity }) => {
    try {
        if (damageSource.damagingEntity.typeId === "minecraft:player") {
            const player = damageSource.damagingEntity
            const enemy = hurtEntity
            let item = player.getComponent("minecraft:equippable").getEquipment("Mainhand")
            let attack = damage
            if (item.typeId == "iron_sword") {
                enemy.runCommandAsync(`summon evocation_fang`)
            }
            return;
        }
    } catch (e) { }
});
