class FlorrUtils {

    decoder = new TextDecoder;

    /** @type {Uint8Array} */
    mem = Module.HEAPU8;

    /// private
    /**
     * @param {string} str
     * @returns {any[]}
     */
    as_vec(str) {
        return JSON.parse(
            `[${str.trim().split("\n").join(",")}]`
        );
    }
    /**
     * @param {number} ptr 
     * @returns {string}
     */
    pass_string(ptr) {

        const mem = this.mem;

        let len = ptr;
        while (mem[len]) len += 1;

        const view = mem.subarray(ptr, len);
        const dec = this.decoder.decode(view);

        return dec;

    };
    /// private
    /**
     * @param {number} size 
     * @param {number} id 
     * @param {number} rarity 
     * @param {number} variable
     * @description
     * about for variable.
     * 0 -> no background,
     * 1 -> normal.
     */
    generate_mob_image(size, id, rarity, variable) {

        const ptr = Module._Util_GenerateMobImage(size, id, rarity, variable);
        const data = this.pass_string(ptr);

        return data;

    };
    /**
     * @param {number} size 
     * @param {number} id 
     * @param {number} rarity 
     * @param {number} variable
     * @description
     * about for variable.
     * 0 -> no background,
     * 1 -> normal,
     * 2 -> no text & no background,
     * 3 -> no text.
     */
    generate_petal_image(size, id, rarity, variable) {

        const ptr = Module._Util_GeneratePetalImage(size, id, rarity, variable);
        const data = this.pass_string(ptr);

        return data;

    };
    get_mobs() {

        const ptr = Module._Util_GetMobs();
        const str = this.pass_string(ptr);
        const vec = this.as_vec(str);

        return vec;

    }
    get_petals() {

        const ptr = Module._Util_GetPetals();
        const str = this.pass_string(ptr);
        const vec = this.as_vec(str);

        return vec;

    }
    get_talents() {

        const ptr = Module._Util_GetTalents();
        const str = this.pass_string(ptr);
        const vec = this.as_vec(str);

        return vec;

    }
    /**
     * @param {number} base 
     * @returns {number} f32 number
     */
    calculate_drop_chance(base) {

        const f32_f64 = Module._Util_CalculateDropChance(base);
        return f32_f64;

    }
    // idk
    get_assembler_matrix() {

        const ptr = Module._Util_GetAssemblerMatrix();
        const str = this.pass_string(ptr);

        return str;

    }

    constructor() {
        if (!this.mem) throw new Error("sorry but please try again :<");
        console.info("%cPlease use below functions.", "color: #cc00cc");
        for (const self of Object.getOwnPropertyNames(FlorrUtils.prototype).splice(3)) {
            console.info(`%cutils.${self}`, "color: #ccfcfc");
        }
    }

}

const utils = new FlorrUtils();
